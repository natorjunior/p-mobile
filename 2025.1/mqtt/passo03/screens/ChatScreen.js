// src/screens/ChatScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

export default function ChatScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Mensagem recebida */}
      <View style={styles.messageLeft}>
        <View style={styles.bubbleLeft}>
          <Text>Olá! Essa é uma mensagem de exemplo.</Text>
        </View>
        <Text style={styles.timeLeft}>10:30</Text>
      </View>

      {/* Mensagem enviada */}
      <View style={styles.messageRight}>
        <View style={styles.bubbleRight}>
          <Text>Oi, tudo bem?</Text>
        </View>
        <Text style={styles.timeRight}>10:31</Text>
      </View>

      {/* Campo de input estático */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem..."
          editable={false}
        />
        <TouchableOpacity style={styles.sendButton} disabled>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE5DD',
    padding: 16
  },
  messageLeft: {
    alignSelf: 'flex-start',
    marginBottom: 12,
    maxWidth: '80%'
  },
  bubbleLeft: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 12
  },
  timeLeft: {
    fontSize: 11,
    color: '#666',
    marginTop: 4
  },
  messageRight: {
    alignSelf: 'flex-end',
    marginBottom: 12,
    maxWidth: '80%'
  },
  bubbleRight: {
    backgroundColor: '#DCF8C6',
    padding: 12,
    borderRadius: 12
  },
  timeRight: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    textAlign: 'right'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 'auto'
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 15,
    justifyContent: 'center'
  },
  sendButton: {
    marginLeft: 8,
    width: 40,
    height: 40,
    backgroundColor: '#075E54',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendText: {
    color: '#FFF',
    fontSize: 20
  }
});
