import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// Dados fictícios para a lista de contatos
const contacts = [
  { id: '1', name: 'Ana', lastMessage: 'Oi, tudo bem?', time: '10:30' },
  { id: '2', name: 'Bruno', lastMessage: 'Vamos sair hoje?', time: '09:45' },
  { id: '3', name: 'Carla', lastMessage: 'Te mando o arquivo depois', time: '08:20' },
  { id: '4', name: 'Diego', lastMessage: 'Haha, boa!', time: 'Ontem' },
  { id: '5', name: 'Elisa', lastMessage: 'Obrigada pelo convite!', time: 'Ontem' },
];
//https://gravatar.com/avatar/39f74bce6f87b83613c040798359ce22?s=400&d=robohash&r=x
//https://gravatar.com/avatar/b64b2befd79fe82609c215101d8e0b6f?s=400&d=robohash&r=x
export default function HomeScreen() {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => navigation.navigate('Chat', { contactName: item.name })}
    >
      <Image
        source={{ uri: 'https://gravatar.com/avatar/b64b2befd79fe82609c215101d8e0b6f?s=400&d=robohash&r=x' }} // Placeholder para foto de perfil
        style={styles.avatar}
      />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.lastMessage}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  flatList: {
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  lastMessage: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
});