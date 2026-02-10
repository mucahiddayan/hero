import axios from 'axios';
import type { ShoppingItem, ShoppingList } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5300/api';

export const getLists = async (): Promise<ShoppingList[]> => {
  const response = await axios.get(`${API_URL}/lists`);
  return response.data;
};

export const createList = async (name: string): Promise<ShoppingList> => {
  const response = await axios.post(`${API_URL}/lists`, { name });
  return response.data;
};

export const getList = async (id: string): Promise<ShoppingList> => {
  const response = await axios.get(`${API_URL}/lists/${id}`);
  return response.data;
};

export const deleteList = async (id: string): Promise<ShoppingList> => {
  const response = await axios.delete(`${API_URL}/lists/${id}`);
  return response.data;
};

export const addItem = async (
  listId: string,
  name: string,
): Promise<ShoppingItem> => {
  const response = await axios.post(`${API_URL}/lists/${listId}/items`, {
    name,
  });
  return response.data;
};

export const updateItem = async (
  itemId: string,
  bought: boolean,
): Promise<ShoppingItem> => {
  const response = await axios.put(`${API_URL}/items/${itemId}`, { bought });
  return response.data;
};

export const deleteItem = async (itemId: string): Promise<void> => {
  await axios.delete(`${API_URL}/items/${itemId}`);
};
