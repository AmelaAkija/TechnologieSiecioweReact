// src/bookService.ts

import axios from 'axios';
import Book from './Book';

const API_URL = 'http://localhost:8080/Book';

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get(`${API_URL}/GetAll`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch books');
  }
};
