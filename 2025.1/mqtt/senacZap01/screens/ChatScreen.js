import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

// Mensagens fictícias para simular o chat
const mockMessages = [
  { id: '1', text: 'Oi, tudo bem?', sender: 'other', time: '10:30' },
  { id: '2', text: 'Tudo ótimo por aqui!', sender: 'me', time: '10:32' },
  { id: '3', text: 'Que bom! 😊', sender: 'other', time: '10:33' },
];

export default function ChatScreen() {
  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockMessages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        contentContainerStyle={{ padding: 10 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE5DD', // Fundo estilo WhatsApp
  },
  messageList: {
    flex: 1,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  otherMessage: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  messageTime: {
    fontSize: 12,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
});