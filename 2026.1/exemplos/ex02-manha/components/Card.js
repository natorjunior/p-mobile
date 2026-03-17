import { Text, View } from "react-native"
//titulo, Um texto qualque de subtitulo
export default function Card({valor1,valor2}) {
    return <View style={{padding:"10px", borderColor:"#000", borderWidth:"5px", margin:"5px"}}> 
        <Text>{valor1}</Text>
        <Text>{valor2}</Text>
    </View>
} 