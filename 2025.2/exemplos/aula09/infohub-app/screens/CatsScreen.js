import React, { useState, useEffect } from 'react';
import {
    View, Text, FlatList, Image, StyleSheet,
    ActivityIndicator, TouchableOpacity,
    Alert, Pressable
} from 'react-native';

export default function CatsScreen() {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCats();
    }, []);

    const fetchCats = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                'https://api.thecatapi.com/v1/images/search?limit=40'
            );
            const data = await response.json();
            setCats(data);
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#3b82f6" />
                <Text style={{ color: '#fff' }}>Carregando...</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.btn}
                onPress={fetchCats}
            >
                <Text style={styles.btnText}>
                    Carregar Novos Gatos
                </Text>
            </TouchableOpacity>

            <FlatList
                data={cats}
                numColumns={2}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    //  <Pressable onPress={() =>
                    //     Alert.alert('Gatinho', 'Miau! 🐱')}
                    // > 
                    <Image
                        source={{ uri: item.url }}
                        style={styles.image}
                        
                    />
                    // </Pressable>
                )}
            />
        </View>
    );
}


const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#1e3c72' 
  },
  centered: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  btn: { 
    backgroundColor: '#3b82f6', 
    padding: 12, 
    margin: 10, 
    borderRadius: 8 
  },
  btnText: { 
    color: '#fff', 
    textAlign: 'center', 
    fontWeight: 'bold' 
  },
  image: { 
    width: '48%', 
    height: 180, 
    margin: '1%', 
    borderRadius: 8 
  },
});
