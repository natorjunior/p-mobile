import { useState } from "react";
import { Text, View } from "react-native";

export default function Mensagem({mensagem}) {
    return (
        <View style={{backgroundColor: 'lightblue', padding: 20, borderRadius: 10}}> 
            <Text>{mensagem}</Text>
        </View>
    );   
}
