import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function EditarLivro({ navigation, route }) {
  const { livro } = route.params;
  const [titulo, setTitulo] = useState(livro.titulo);
  const [autor, setAutor] = useState(livro.autor);

  const edit = () => {
    if (titulo.trim() === '' || autor.trim() === '') {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    fetch(`https://livros.acilab.com.br/api/livros/${livro.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ titulo, autor }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        Alert.alert('Sucesso', 'Livro editado com sucesso!');
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Erro ao editar livro:', error);
        Alert.alert('Erro', 'Não foi possível editar o livro.');
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
      <Button title="Editar Livro" onPress={edit} />
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
