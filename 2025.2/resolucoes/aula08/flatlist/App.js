import React from 'react';
import { SafeAreaView, View, Text, FlatList, StyleSheet } from 'react-native';

const dados = [
  { id: '1', titulo: 'Item 1' },
  { id: '2', titulo: 'Item 2' },
  { id: '3', titulo: 'Item 3' },
];

export default function App() {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.subtitulo}>ID: {item.id}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={() => (
          <Text style={styles.header}>Minha Lista</Text>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  header: { color: '#fff', fontSize: 18, fontWeight: 'bold', margin: 12 },
  item: { padding: 12 },
  titulo: { color: '#fff' },
  subtitulo: { color: '#9ca3af', fontSize: 12 },
  separator: { height: 1, backgroundColor: '#222' },
});
