import { useState, useEffect } from 'react';
import { Alert, Button, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home({ navigation }) {
  const [listaDeLivros, setListaDeLivros] = useState([]);
  const [refresh, setRefresh] = useState(false);
  
  useEffect(() => {
    fetch('https://livros.acilab.com.br/api/livros')
      .then((response) => response.json())
      .then((data) => {
        setListaDeLivros(data);
      })
      .catch((error) => {
        console.error('Erro ao buscar livros:', error);
        setListaDeLivros([]);
      });
  }, [refresh]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setRefresh(prev => !prev);
    });
    return unsubscribe;
  }, [navigation]);

  const addLivro = () => {
    navigation.navigate('AdicionarLivro');
  };

  const editLivro = (item) => {
    navigation.navigate('EditarLivro', { livro: item });
  };

  const atualizar = () => {
    setRefresh(prev => !prev);
    Alert.alert('Aviso', 'Lista atualizada!');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Adicionar Livro" onPress={addLivro} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Atualizar" onPress={atualizar} />
        </View>
      </View>
      <FlatList
        data={listaDeLivros}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.livroItem}
            onPress={() => editLivro(item)}
            activeOpacity={0.7}
          >
            <View style={styles.livroContent}>
              <Text style={styles.titulo}>{item.titulo}</Text>
              <Text style={styles.autor}>{item.autor}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 12,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  buttonWrapper: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 16,
  },
  livroItem: {
    backgroundColor: '#f9f9f9',
    marginVertical: 6,
    marginHorizontal: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  livroContent: {
    padding: 12,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  autor: {
    fontSize: 14,
    color: '#666',
  },
});


