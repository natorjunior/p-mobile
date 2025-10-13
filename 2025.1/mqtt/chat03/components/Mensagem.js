import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Mensagem({ texto, hora, enviado }) {
  return (
    <View
      style={[
        styles.container,
        enviado ? styles.containerEnviado : styles.containerRecebido,
      ]}
    >
      <View
        style={[
          styles.bubble,
          enviado ? styles.bubbleEnviado : styles.bubbleRecebido,
        ]}
      >
        <Text style={styles.texto}>{texto}</Text>
        <View style={styles.metadata}>
          <Text style={styles.hora}>{hora}</Text>
          {enviado && <Text style={styles.confirmacao}> ✓✓</Text>}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 4,
    marginHorizontal: 8,
  },
  containerEnviado: {
    justifyContent: 'flex-end',
  },
  containerRecebido: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  bubbleEnviado: {
    backgroundColor: '#DCF8C6', // verde claro WhatsApp-style
  },
  bubbleRecebido: {
    backgroundColor: '#FFFFFF',
  },
  texto: {
    fontSize: 16,
    marginBottom: 4,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  hora: {
    fontSize: 12,
    color: '#555',
  },
  confirmacao: {
    fontSize: 12,
    color: '#555',
    marginLeft: 4,
  },
});
