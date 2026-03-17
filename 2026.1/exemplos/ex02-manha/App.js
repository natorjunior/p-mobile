import { StyleSheet, Text, View } from 'react-native';
import HelloWorld from './components/HelloWorld';
import Card from './components/Card';

export default function App() {
  return (
    <View>
      <Card valor1="titulo" valor2="Um texto qualque de subtitulo" />
      <Card valor1="titulo" valor2="Um texto qualque de subtitulo" />
      <Card valor1="titulo" valor2="Um texto qualque de subtitulo" />
    </View>
  );
}
