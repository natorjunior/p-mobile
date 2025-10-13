// src/screens/HomeScreen.js
import React from 'react';
import { SafeAreaView, View, Text, Image } from 'react-native';

const contacts = [
  { id: '1', name: 'Ana' },
  { id: '2', name: 'Bruno' },
  { id: '3', name: 'Carla' },
  { id: '4', name: 'Diego' },
  { id: '5', name: 'Elisa' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F7F7', padding: 16 }}>
      {contacts.map(contact => (
        <View key={contact.id} style={{ marginBottom: 12 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: `https://placehold.co/100.png` }}
              style={{ width: 50, height: 50, borderRadius: 25, marginRight: 12 }}
            />
            <Text style={{ fontSize: 16, fontWeight: '600' }}>
              {contact.name}
            </Text>
          </View>
          <View style={{ height: 1, backgroundColor: '#CCC', marginTop: 8 }} />
        </View>
      ))}
    </SafeAreaView>
  );
}
