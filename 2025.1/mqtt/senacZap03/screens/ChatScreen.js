import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import Paho from 'paho-mqtt';

export default function ChatScreen({ route }) {
  const { topic, meuTopico } = route.params;
  const [mensagens, setMensagens] = useState([]);
  const [textoInput, setTextoInput] = useState('');
  const [cliente, setCliente] = useState(null);

  useEffect(() => {
    const mqttClient = new Paho.Client('mqtt.acilab.com.br', 443, '/mqtt',`client-${Math.random().toString(36).slice(2)}`);
    mqttClient.onMessageArrived = (msg) => {
      setMensagens((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).slice(2),
          text: msg.payloadString,
          sender: 'other',
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    };
    mqttClient.connect({
       useSSL: true,
      onSuccess: () => {
        mqttClient.subscribe("chat/"+meuTopico.toLowerCase());
        setCliente(mqttClient);
      },
      onFailure: (erro) => console.error('Erro:', erro),
    });
    return () => {
      if (mqttClient.isConnected()) mqttClient.disconnect();
    };
  }, [topic]);

  const enviarMensagem = () => {
    if (textoInput && cliente?.isConnected()) {
      const mensagem = new Paho.Message(textoInput);
      mensagem.destinationName = topic;
      cliente.send(mensagem);
      setMensagens((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).slice(2),
          text: textoInput,
          sender: 'me',
          time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          enviado: Math.random() < 0.5,
        },
      ]);
      setTextoInput('');
    }
  };

  const renderMessage = ({ item }) => (
    <View style={[styles.messageContainer, item.sender === 'me' ? styles.myMessage : styles.otherMessage]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time} {item.sender === 'me' && (item.enviado ? '[Enviado]' : '[Não enviado]')}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
      >
        <FlatList
          data={mensagens}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          style={styles.messageList}
          contentContainerStyle={styles.messageListContent}
          keyboardShouldPersistTaps="handled"
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={textoInput}
            onChangeText={setTextoInput}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.sendButton} onPress={enviarMensagem}>
            <Text style={styles.sendButtonText}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECE5DD',
  },
  keyboardContainer: {
    flex: 1,
  },
  messageList: {
    flex: 1,
  },
  messageListContent: {
    padding: 12,
    paddingBottom: 20,
  },
  messageContainer: {
    maxWidth: '80%',
    marginVertical: 6,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
    marginRight: 12,
    borderTopRightRadius: 4,
  },
  otherMessage: {
    backgroundColor: '#FFF',
    alignSelf: 'flex-start',
    marginLeft: 12,
    borderTopLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: '#000',
    lineHeight: 20,
  },
  messageTime: {
    fontSize: 11,
    color: '#666',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#FFF',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#D0D0D0',
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginRight: 8,
    fontSize: 16,
    color: '#000',
  },
  sendButton: {
    backgroundColor: '#075E54',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
});