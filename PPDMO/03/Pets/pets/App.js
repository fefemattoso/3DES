import React, {useState} from "react";
import { StyleSheet, Text, View, Button, TextInput, FlatList, Image } from "react-native";
import {db} from "./firebaseconfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function App() {
  const [nomePet, SetNomePet] = useState("");
  const [tipoPet, SetTipoPet] = useState("");
  const [ pets, setPets] = useState([]);
  const [loading, setLoading] = useState(false);

  const adicionarPet = async () => {
    try{
      setLoading(true);
      await addDoc(collection(db,"pets"),{
        nome: nomePet,
        tipo: tipoPet
      });
      alert("Pet aicionado com sucesso!");
      SetNomePet('');
      setTipoPet('');
      fetchPets();
    }catch(e){
      conbsole.error("Erro ao adicionar pet", e);
    }finally{
      setLoading(false);
    }
  };
  
  const fetchPets = async () => {
  try{
    const querySnapshot = await getDocs(collection(db, "pets"));
    const petslist = querySnapshot.docs.map(doc => doc.data());
    setPets(petslist);
  } catch (e) {
    console.error("Erro ao buscar pets", e);
  }
};

return(
  <View style={StyleSheet.container}>
    <Text style={style.title}>Pets SENAI</Text>
    <Text style={StyleSheet.label}>Nome do Pet</Text>
    <TextInput style={styles.input} placeholder="Digite o nome do pet" value={nomePet} onChangeText={SetNomePet}/>
  </View>
)

}