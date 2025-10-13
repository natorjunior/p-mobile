import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';

export default function App() {
  const [nome, setNome] = useState('');
  const [nomeArmazenado, setNomeArmazenado] = useState('');

  const salvarNome = async () => {
    try {
      await AsyncStorage.setItem('@nome', nome);
      alert('Nome salvo com sucesso!');
      carregarNome(); 
    } catch (erro) {
      alert('Erro ao salvar o nome');
    }
  };

  const carregarNome = async () => {
    try {
      const valorSalvo = await AsyncStorage.getItem('@nome');
      if (valorSalvo !== null) {
        setNomeArmazenado(valorSalvo);
      }
    } catch (erro) {
      alert('Erro ao carregar o nome');
    }
  };


  useEffect(() => {
    carregarNome();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome"
      />
      <Button title="Salvar Nome" onPress={salvarNome} />
      
      <Text style={styles.texto}>Nome armazenado: {nomeArmazenado}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  texto: {
    marginTop: 20,
    fontSize: 16,
  },
});
