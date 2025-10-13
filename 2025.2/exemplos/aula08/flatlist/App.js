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
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dados}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111' },
  item: { padding: 12 },
  titulo: { color: '#fff' }
});
