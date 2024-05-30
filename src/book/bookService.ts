import axios from 'axios';

// Function to fetch all books from the backend
export const fetchBooks = async () => {
  try {
    // Make an HTTP GET request to the backend endpoint
    const response = await axios.get('http://localhost:8080/Book/GetAll');
    // Extract the array of books from the response data
    const books = response.data;
    return books;
  } catch (error) {
    // Handle errors if any
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books');
  }
};
