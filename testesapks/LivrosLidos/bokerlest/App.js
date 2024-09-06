import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { db, storage } from './firebaseconfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';

export default function App() {
  const [nomeLivro, setNomeLivro] = useState('');
  const [autorLivro, setAutorLivro] = useState('');
  const [editoraLivro, setEditoraLivro] = useState('');
  const [anoLivro, setAnoLivro] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [statusLeitura, setStatusLeitura] = useState('não lido');
  const [livros, setLivros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingLivroId, setEditingLivroId] = useState(null);

  const selecionarImagem = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async () => {
    if (!imageUri) return null;

    const response = await fetch(imageUri);
    const blob = await response.blob();
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `livros/${filename}`);
    
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  const adicionarOuAtualizarLivro = async () => {
    try {
      setLoading(true);
      const imageUrl = await uploadImage();

      if (editingLivroId) {
        const livroRef = doc(db, 'livros', editingLivroId);
        await updateDoc(livroRef, {
          nome: nomeLivro,
          autor: autorLivro,
          editora: editoraLivro,
          ano: anoLivro,
          status: statusLeitura,
          imageUrl: imageUrl || null
        });
        alert('Livro atualizado com sucesso!');
        setEditingLivroId(null);
      } else {
        await addDoc(collection(db, 'livros'), {
          nome: nomeLivro,
          autor: autorLivro,
          editora: editoraLivro,
          ano: anoLivro,
          status: statusLeitura,
          imageUrl: imageUrl || null
        });
        alert('Livro adicionado com sucesso!');
      }

      setNomeLivro('');
      setAutorLivro('');
      setEditoraLivro('');
      setAnoLivro('');
      setStatusLeitura('não lido');
      setImageUri(null);
      fetchLivros();
    } catch (e) {
      console.error("Erro ao salvar livro: ", e);
    } finally {
      setLoading(false);
    }
  };

  const fetchLivros = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'livros'));
      const livrosList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setLivros(livrosList);
    } catch (e) {
      console.error("Erro ao buscar livros: ", e);
    }
  };

  const editarLivro = (livro) => {
    setNomeLivro(livro.nome);
    setAutorLivro(livro.autor);
    setEditoraLivro(livro.editora);
    setAnoLivro(livro.ano);
    setStatusLeitura(livro.status);
    setImageUri(livro.imageUrl);
    setEditingLivroId(livro.id);
  };

  const excluirLivro = async (livroId) => {
    try {
      await deleteDoc(doc(db, 'livros', livroId));
      alert('Livro excluído com sucesso!');
      fetchLivros();
    } catch (e) {
      console.error("Erro ao excluir livro: ", e);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Livros Lidos</Text>
      <Image source={require('../bokerlest/assets/')} style={styles.leafTopLeft} />
      
      <Text style={styles.label}>Nome do Livro</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do livro"
        value={nomeLivro}
        onChangeText={setNomeLivro}
      />
      
      <Text style={styles.label}>Autor</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o autor do livro"
        value={autorLivro}
        onChangeText={setAutorLivro}
      />

      <Text style={styles.label}>Editora</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite a editora do livro"
        value={editoraLivro}
        onChangeText={setEditoraLivro}
      />

      <Text style={styles.label}>Ano</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o ano de publicação"
        value={anoLivro}
        onChangeText={setAnoLivro}
      />

      <Text style={styles.label}>Status de Leitura</Text>
      <TextInput
        style={styles.input}
        placeholder="Já leu ou está lendo?"
        value={statusLeitura}
        onChangeText={setStatusLeitura}
      />
  <View style={styles.buttonContainer}>
      <Button 
        title="Selecionar Imagem" 
        onPress={selecionarImagem} 
        color="#9e3771"
      />

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      <Button borderRadius={20}
        title={loading ? "Salvando..." : editingLivroId ? "Atualizar Livro" : "Adicionar Livro"} 
        onPress={adicionarOuAtualizarLivro} 
        color="#b36d94"
      />
  </View>
      <Text style={styles.sectionTitle}>Lista de Livros</Text>
      <FlatList style={styles.livroList}
        data={livros}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.livroItem}>
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.livroImage} />
            ) : (
              <Icon name="book" size={50} color="#4682b4" style={styles.livroIcon} />
            )}
            <View style={styles.livroDetails}>
              <Text style={styles.livroName}>{item.nome}</Text>
              <Text style={styles.livroAutor}>{item.autor}</Text>
              <Text style={styles.livroEditora}>{item.editora}</Text>
              <Text style={styles.livroAno}>{item.ano}</Text>
              <Text style={styles.livroStatus}>{item.status}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => editarLivro(item)} style={styles.actionButton}>
                <Icon name="edit" size={25} color="#4682b4" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirLivro(item.id)} style={styles.actionButton}>
                <Icon name="trash" size={25} color="#ff6347" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe0f2',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9e3771',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: '#6b8e23',
    color: '#fff',
    padding: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9e3771',
    marginTop: 20,
    marginBottom: 10,
  },
  livroList: {
    marginTop: 10,
  },
  livroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  livroIcon: {
    marginRight: 15,
  },
  livroImage: {
    width: 50,
    height: 70,
    borderRadius: 5,
    marginRight: 15,
  },
  livroDetails: {
    flex: 1,
  },
  livroName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  livroAutor: {
    fontSize: 16,
    color: '#555',
  },
  livroEditora: {
    fontSize: 16,
    color: '#555',
  },
  livroAno: {
    fontSize: 16,
    color: '#555',
  },
  livroStatus: {
    fontSize: 16,
    color: '#888',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
  },
});
