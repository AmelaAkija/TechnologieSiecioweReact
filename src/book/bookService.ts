import axios from 'axios';
import Book from './Book';

const API_URL = 'http://localhost:8080/Book';

export const fetchBooks = async (): Promise<Book[]> => {
  try {
    const response = await axios.get(`${API_URL}/GetAll`);
    console.log('Response data:', response.data); // Add logging
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};
