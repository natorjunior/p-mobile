import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';

export default function CryptoScreen() {
    const [cryptos, setCryptos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tendenciaGeral, setTendenciaGeral] = useState(0);
    useEffect(() => {
        fetchCryptos();
        const interval = setInterval(fetchCryptos, 30000);
        return () => clearInterval(interval);
    }, []);

    const fetchCryptos = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                'https://api.coingecko.com/api/v3/coins/markets?vs_currency=brl&order=market_cap_desc&per_page=15&page=1'
            );
            const data = await response.json();
            let tendenciaGeral = data.reduce((acumulador, coin) => {
                return acumulador + (coin.price_change_percentage_24h || 0);
            }, 0) / data.length;
            setTendenciaGeral(tendenciaGeral);
            setCryptos(data);
        } catch (error) {
            console.error('Erro:', error);
        } finally {
            setLoading(false);
        }
    };
    const renderCrypto = ({ item }) => {
        const change = item.price_change_percentage_24h || 0;
        const isPositive = change >= 0;

        return (
            <View style={styles.card}>
                <View style={styles.header}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.price}>
                        R$ {item.current_price.toLocaleString('pt-BR')}
                    </Text>
                    <Text style={{ color: isPositive ? '#22c55e' : '#ef4444', fontWeight: 'bold' }}>
                        {isPositive ? '▲' : '▼'} {Math.abs(change).toFixed(1)}%
                    </Text>
                </View>
            </View>
        );
    };
    if (loading && cryptos.length === 0) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#3b82f6" />
                <Text style={{ color: '#fff' }}>Carregando...</Text>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <View style={styles.headerBar}>
                <Text style={styles.title}>Cotações</Text>
                <TouchableOpacity onPress={fetchCryptos}>
                    <Text style={{ fontSize: 18 }}>⟳</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.headerBar}>
                <Text style={styles.title}>
                    Tendência Geral (24h): {Math.abs(tendenciaGeral.toFixed(2))}% {tendenciaGeral.toFixed(2)>=0? '▲' : '▼'}
                </Text>
            </View>
            <FlatList
                data={cryptos}
                renderItem={renderCrypto}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#1e3c72' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    headerBar: { flexDirection: 'row', justifyContent: 'space-between', padding: 12, borderBottomWidth: 1, borderBottomColor: '#3b82f6' },
    title: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    list: { padding: 10 },
    card: { backgroundColor: '#2a5298', borderRadius: 8, padding: 12, marginBottom: 10 },
    header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
    name: { color: '#fff', fontWeight: 'bold' },
    symbol: { fontSize: 12, color: '#93c5fd' },
    footer: { flexDirection: 'row', justifyContent: 'space-between' },
    price: { color: '#93c5fd', fontWeight: 'bold' },
});
