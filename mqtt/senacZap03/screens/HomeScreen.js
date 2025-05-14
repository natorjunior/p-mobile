import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const contacts = [
  { id: '1', name: 'Ana', lastMessage: 'Oi, tudo bem?', time: '10:30', active: true },
  { id: '2', name: 'Bruno', lastMessage: 'Vamos sair hoje?', time: '09:45', active: true },
  { id: '3', name: 'Carla', lastMessage: 'Te mando o arquivo depois', time: '08:20', active: true },
  { id: '4', name: 'Diego', lastMessage: 'Haha, boa!', time: 'Ontem', active: true },
  { id: '5', name: 'Elisa', lastMessage: 'Obrigada pelo convite!', time: 'Ontem', active: true },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const [selectedContact, setSelectedContact] = useState(null);

  // Seleciona somente uma vez na montagem
  useEffect(() => {
    const random = contacts[Math.floor(Math.random() * contacts.length)];
    setSelectedContact(random);
  }, []);

  const renderItem = ({ item }) => {
    if (!item.active) return null;

    return (<TouchableOpacity
      style={styles.contactItem}
      onPress={() => navigation.navigate('Chat', {
        contactName: item.name,
        meuTopico: selectedContact?.name,
        topic: `chat/${item.name.toLowerCase()}`
      })}
    >
      <Image
        source={{ uri: `https://gravatar.com/avatar/${item.id}39f74bce6f87b83613c040798359ce22?s=400&d=robohash&r=x` }}
        style={styles.avatar}
      />
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
      </View>
      <Text style={styles.time}>{item.time}</Text>
    </TouchableOpacity>
    )
  };

  return (
    <SafeAreaView style={styles.container}>

      {selectedContact && (
        <TouchableOpacity
          style={styles.selectedContainer}
          onPress={() => navigation.navigate('Chat', {
            contactName: selectedContact.name,
            meuTopico: selectedContact.name,
            topic: `chat/${selectedContact.name.toLowerCase()}`
          })}
        >
          
          <Image
            source={{ uri: `https://gravatar.com/avatar/${selectedContact.id}39f74bce6f87b83613c040798359ce22?s=400&d=robohash&r=x` }}
            style={styles.avatarTiny}
          />
          <Text style={styles.selectedName}>{selectedContact.name}</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  flatList: {
    flex: 1,
  },
  contactItem: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 2,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  avatarTiny: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
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
  selectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  selectedName: {
    fontSize: 14,
    color: '#075E54',
    fontWeight: '600',
  },
});
