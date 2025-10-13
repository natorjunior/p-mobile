import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { initDB, insertUser, fetchUsers, updateUser, deleteUser } from './database';

export default function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        await initDB();
        const initialUsers = await fetchUsers();
        setUsers(initialUsers);
      } catch (error) {
        console.error('Erro ao inicializar o banco de dados:', error);
      }
    };
    initializeDatabase();
  }, []);

  const handleAddUser = async () => {
    try {
      await insertUser('João', 30);
      const updatedUsers = await fetchUsers();
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error);
    }
  };

  const handleUpdateUser = async () => {
    if (users.length > 0) {
      try {
        const user = users[0];
        await updateUser(user.id, 'João Atualizado', 31);
        const updatedUsers = await fetchUsers();
        setUsers(updatedUsers);
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
      }
    }
  };

  const handleDeleteUser = async () => {
    if (users.length > 0) {
      try {
        const user = users[0];
        await deleteUser(user.id);
        const updatedUsers = await fetchUsers();
        setUsers(updatedUsers);
      } catch (error) {
        console.error('Erro ao deletar usuário:', error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button title="Adicionar Usuário" onPress={handleAddUser} />
      <Button title="Atualizar Primeiro Usuário" onPress={handleUpdateUser} />
      <Button title="Deletar Primeiro Usuário" onPress={handleDeleteUser} />
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.userText}>{item.name} - {item.age} anos</Text>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  userText: {
    fontSize: 16,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});