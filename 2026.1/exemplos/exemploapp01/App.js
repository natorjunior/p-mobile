import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';

export default function App() {
  var nome = "Nator Junior"
  var idade = 25
  var curso = "Ciencia da Computação"

  return (
    <View style={{flex:1, alignItems: "center", justifyContent: "center"}}>
      <Text>Meu nome é {nome}</Text>
      <Text> {curso}</Text>
      <Text>{idade}</Text>
      <Text>{idade >=18 ? "Maior de idade":"Menor de Idade"}</Text>
    </View>
  );
}
