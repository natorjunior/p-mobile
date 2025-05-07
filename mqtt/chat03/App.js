import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Paho from 'paho-mqtt';
import Mensagem from "./components/Mensagem"

// Configuração MQTT
const BROKER = 'broker.hivemq.com';
const PORT = 8000;
const TOPICO = 'chat/teste';
const CLIENT_ID = `client-${Math.random().toString(36).slice(2)}`;

export default function App() {
  const [mensagem, setMensagem] = useState('Aguardando mensagem');
  const [lista, setLista] = useState([ ]);

  useEffect(() => {
    const cliente = new Paho.Client(BROKER, PORT, CLIENT_ID);
    cliente.onMessageArrived = (msg) => {
      setMensagem(msg.payloadString);
      setLista((prevLista) => [
        ...prevLista,
        { id: Math.random().toString(36).slice(2), texto: msg.payloadString, hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), enviado: Math.random() < 0.5  },
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
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <Text>{mensagem}</Text>
      <View>
        <FlatList
          data={lista}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Mensagem key="1" texto={item.texto} hora={item.hora} enviado={item.enviado} /> }
        />
      </View>
      
    </SafeAreaView>
  );
}

