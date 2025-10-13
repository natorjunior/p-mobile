import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function App() {
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function fetchDados() {
      try {
        const resp = await fetch('https://jsonplaceholder.typicode.com/users');
        const json = await resp.json();
        setDados(json);
      } catch (e) {
        setErro('Falha ao carregar');
      } finally {
        setLoading(false);
      }
    }
    fetchDados();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (erro) {
    return <Text style={{ color: 'tomato', textAlign: 'center', marginTop: 32 }}>{erro}</Text>;
  }

  return (
    <FlatList
      data={dados}
      keyExtractor={(item) => String(item.id)}
      ListEmptyComponent={() => <Text style={{ textAlign: 'center', marginTop: 16 }}>Sem dados.</Text>}
      renderItem={({ item }) => (
        <View style={{ padding: 8 }}>
          <Text>{item.name}</Text>
          <Text style={{ color: '#555' }}>{item.email}</Text>
        </View>
      )}
    />
  );
}
