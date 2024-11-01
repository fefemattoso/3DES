import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { db, storage } from './firebaseconfig'; // Importando a configuração do Firebase
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const auth = getAuth();
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [data, setData] = useState(new Date());
  const [imageUri, setImageUri] = useState(null);
  const [entradas, setEntradas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingEntradaId, setEditingEntradaId] = useState(null);

  // Função para selecionar imagem
  const selecionarImagem = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (!response.didCancel && response.assets) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  // Função para fazer o upload da imagem
  const uploadImage = async () => {
    if (!imageUri) return null;
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const storageRef = ref(storage, `entradas/${filename}`);
    await uploadBytes(storageRef, blob);
    return await getDownloadURL(storageRef);
  };

  // Função para adicionar ou atualizar entrada
  const adicionarOuAtualizarEntrada = async () => {
    try {
      setLoading(true);
      const imageUrl = await uploadImage();

      if (editingEntradaId) {
        const entradaRef = doc(db, 'entradas', editingEntradaId);
        await updateDoc(entradaRef, {
          titulo,
          descricao,
          localizacao,
          data,
          imageUrl: imageUrl || null
        });
        alert('Entrada atualizada com sucesso!');
        setEditingEntradaId(null);
      } else {
        await addDoc(collection(db, 'entradas'), {
          titulo,
          descricao,
          localizacao,
          data,
          imageUrl: imageUrl || null
        });
        alert('Entrada adicionada com sucesso!');
      }

      setTitulo('');
      setDescricao('');
      setLocalizacao('');
      setImageUri(null);
      fetchEntradas();
    } catch (e) {
      console.error("Erro ao salvar entrada: ", e);
    } finally {
      setLoading(false);
    }
  };

  // Função para buscar as entradas do Firebase
  const fetchEntradas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'entradas'));
      const entradasList = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      }));
      setEntradas(entradasList);
    } catch (e) {
      console.error("Erro ao buscar entradas: ", e);
    }
  };

  // Função para carregar os dados de uma entrada ao editar
  const editarEntrada = (entrada) => {
    setTitulo(entrada.titulo);
    setDescricao(entrada.descricao);
    setLocalizacao(entrada.localizacao);
    setImageUri(entrada.imageUrl);
    setEditingEntradaId(entrada.id);
  };

  // Função para excluir uma entrada
  const excluirEntrada = async (entradaId) => {
    try {
      await deleteDoc(doc(db, 'entradas', entradaId));
      alert('Entrada excluída com sucesso!');
      fetchEntradas();
    } catch (e) {
      console.error("Erro ao excluir entrada: ", e);
    }
  };

  // Função de Login
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        alert("Erro ao fazer login: " + error.message);
      });
  };

  // Função de Registro
  const handleRegister = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        alert("Erro ao registrar: " + error.message);
      });
  };

  // Função de Logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        alert("Erro ao fazer logout: " + error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchEntradas();
      }
    });
    return () => unsubscribe();
  }, []);

  // Condição para mostrar a tela de login/registro ou a tela do diário
  if (!user) {
    return (
      <View style={styles.container}>
        <Image source={require('../travel-diary/assets/favicon.png')} style={styles.bussola} />
        <Text style={styles.title}>Travel Tales - Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Login" onPress={handleLogin} color="#AC4E1A" />
        <Button title="Registrar" onPress={handleRegister} color="#965C2F" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../travel-diary/assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Travel Tales</Text>
        <Button title="Logout" onPress={handleLogout} color="#AC4E1A" />
      </View>

      <Text style={styles.label}>Título da Viagem</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título da viagem"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Descrição da viagem"
        value={descricao}
        onChangeText={setDescricao}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Localização</Text>
      <TextInput
        style={styles.input}
        placeholder="Localização da viagem"
        value={localizacao}
        onChangeText={setLocalizacao}
      />

      <TouchableOpacity style={styles.imageButton} onPress={selecionarImagem}>
        <Text style={styles.imageButtonText}>Selecionar Imagem</Text>
      </TouchableOpacity>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      <Button
        title={loading ? "Salvando..." : editingEntradaId ? "Atualizar Entrada" : "Adicionar Entrada"}
        onPress={adicionarOuAtualizarEntrada}
        color="#AC4E1A"
      />

      <Text style={styles.sectionTitle}>Lista de Entradas</Text>
      <FlatList
        data={entradas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.entradaItem}>
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.entradaImage} />
            ) : null}
            <View style={styles.entradaDetails}>
              <Text style={styles.entradaTitulo}>{item.titulo}</Text>
              <Text style={styles.entradaDescricao}>{item.descricao}</Text>
              <Text style={styles.entradaLocalizacao}>{item.localizacao}</Text>
              <Text style={styles.entradaData}>{item.data.toDate().toDateString()}</Text>
            </View>
            <View style={styles.actionButtons}>
              <TouchableOpacity onPress={() => editarEntrada(item)} style={styles.actionButton}>
                <Text style={styles.actionText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => excluirEntrada(item.id)} style={styles.actionButton}>
                <Text style={styles.actionText}>Excluir</Text>
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
    backgroundColor: '#FCCD9A',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 200,
  },
  bussola: {
    alignItems: 'center',
    width: 200,
    height: 200,
    textAlign: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#AC4E1A',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#965C2F',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#965C2F',
    marginBottom: 5,
  },
  imageButton: {
    backgroundColor: '#965C2F',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  imageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#AC4E1A',
    marginTop: 20,
    marginBottom: 10,
  },
  entradaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  entradaImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
  },
  entradaDetails: {
    flex: 1,
    marginRight: 10,
  },
  entradaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#385332',
  },
  entradaDescricao: {
    fontSize: 16,
    color: '#555',
  },
  entradaLocalizacao: {
    fontSize: 14,
    color: '#777',
  },
  entradaData: {
    fontSize: 12,
    color: '#888',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 10,
  },
  actionText: {
    color: '#AC4E1A',
    fontWeight: 'bold',
  },
});
