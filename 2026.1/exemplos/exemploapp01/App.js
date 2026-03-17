import React, {useEffect, useState} from "react"
import { StyleSheet, Text, View } from 'react-native';


export default function App() {
  const [posts, setPosts] = useState({cep:10});
  useEffect(()=>{
    async function getDados(){
        let data = await fetch("https://viacep.com.br/ws/01001000/json");
        //  setPosts(data.json())
    }
    getDados()
  },[])
  return (
    <View>

      <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text></Text>
    <Text>Dados: {posts.cep}</Text>
    </View>
  );
}
