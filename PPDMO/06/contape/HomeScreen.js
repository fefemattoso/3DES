import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
    return (
        <View style={style.container}>
            <Text style={style.text}>Contador de Passos</Text>
            <Button title = "Iniciar Contador" onPress = {() => navigation.navigate('Contador')} />
            {/* <Button title = "Iniciar Acelerometro" onPress = {() => navigation.navigate('Acelerometro')}/> */}
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },



})