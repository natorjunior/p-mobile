import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, Alert, Button, TextInput } from 'react-native';

export default function App() {
  const [text, setText] = useState("")
  const a = ""
  return (
    <View style={{ flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' }}>
        <Text>Kalvo</Text>
        <Text>Felipe do Mengão</Text>
        <Image 
            source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
            style={{width: 100, height: 100}} 
        /> 
        <Button 
            title="Pressione" 
            onPress={() => Alert.alert('Botão pressionado!')}
        /> 
        <TextInput 
            style={{height: 40, borderColor: 'gray', borderWidth: 1, width: 200, paddingHorizontal: 10}} 
            placeholder="000000"
            onChangeText={setText}
            value={text}
        /> 
        <Text>Você digitou: {text}</Text>
    </View>
  );
}
