import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Paho from 'paho-mqtt';

// Configuração MQTT
const BROKER = 'broker.hivemq.com';
const PORT = 8000;
const TOPICO = 'chat/teste';
const CLIENT_ID = `client-${Math.random().toString(36).slice(2)}`;

export default function App() {
  const [mensagem, setMensagem] = useState('Aguardando mensagem');
  const [lista, setLista] = useState([]);

  useEffect(() => {
    const cliente = new Paho.Client(BROKER, PORT, CLIENT_ID);
    cliente.onMessageArrived = (msg) => {
      setMensagem(msg.payloadString);
      setLista((prevLista) => [
        ...prevLista,
        { id: Math.random().toString(36).slice(2), texto: msg.payloadString },
      ]);
    };
    cliente.connect({
      onSuccess: () => cliente.subscribe(TOPICO),
    });
    return () => {
      if (cliente.isConnected()) cliente.disconnect();
    };
  }, []);

  return (
    <SafeAreaView style={estilos.container}>
      <Text style={estilos.texto}>{mensagem}</Text>
      <View style={{ marginTop: 20 }}>
        <FlatList
          data={lista}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Text style={estilos.texto}>{item.texto}</Text>}
        />
      </View>
      
    </SafeAreaView>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    fontSize: 18,
    color: '#333',
  },
});