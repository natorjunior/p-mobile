import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Ir para Detalhes"
        onPress={() => navigation.navigate('Details', { id: 7, titulo: 'Item 7' })}
      />
    </View>
  );
}

function DetailsScreen({ route, navigation }) {
  const { id, titulo } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: titulo ?? 'Detalhes',
      headerRight: () => (
        <Button title="Info" onPress={() => alert('Info')} />
      ),
    });
  }, [navigation, titulo]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>ID: {id}</Text>
      <Text>Título: {titulo}</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
