import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function AdicionarLivro({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');

  const add = () => {
    if (titulo.trim() === '' || autor.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    fetch('https://livros.acilab.com.br/api/livros', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo, autor }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Erro ao adicionar livro');
        }
        return response.json();
      })
      .then((data) => {
        Alert.alert('Sucesso', 'Livro adicionado com sucesso!');
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Erro ao adicionar livro:', error);
        Alert.alert('Erro', 'Não foi possível adicionar o livro.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Digite o título do livro"
      />
      <Text style={styles.label}>Autor:</Text>
      <TextInput
        style={styles.input}
        value={autor}
        onChangeText={setAutor}
        placeholder="Digite o autor do livro"
      />
      <Button title="Adicionar Livro" onPress={add} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});
