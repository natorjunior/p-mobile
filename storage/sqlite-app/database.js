import { openDatabaseAsync } from 'expo-sqlite';

let db;

export const initDB = async () => {
  try {
    db = await openDatabaseAsync('users.db');
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL
      );
    `);
    console.log('Banco de dados inicializado com sucesso');
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    throw error;
  }
};

export const insertUser = async (name, age) => {
  if (!db) {
    throw new Error('Database not initialized. Call initDB() first.');
  }
  try {
    await db.runAsync('INSERT INTO users (name, age) VALUES (?, ?);', [name, age]);
    console.log('Usuário inserido com sucesso');
  } catch (error) {
    console.error('Erro ao inserir usuário:', error);
    throw error;
  }
};

export const fetchUsers = async () => {
  if (!db) {
    throw new Error('Database not initialized. Call initDB() first.');
  }
  try {
    const result = await db.getAllAsync('SELECT * FROM users;');
    return result;
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    throw error;
  }
};

export const updateUser = async (id, name, age) => {
  if (!db) {
    throw new Error('Database not initialized. Call initDB() first.');
  }
  try {
    await db.runAsync('UPDATE users SET name = ?, age = ? WHERE id = ?;', [name, age, id]);
    console.log('Usuário atualizado com sucesso');
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  if (!db) {
    throw new Error('Database not initialized. Call initDB() first.');
  }
  try {
    await db.runAsync('DELETE FROM users WHERE id = ?;', [id]);
    console.log('Usuário deletado com sucesso');
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
};