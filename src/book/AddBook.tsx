import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from 'axios'; // Import AxiosError
import './AddBook.css';

const AddBook = ({ role }: { role: string }) => {
  console.log('role:', role);
  const [book, setBook] = useState({
    isbn: '',
    title: '',
    author: '',
    publisher: '',
    publishYear: '',
    availableCopies: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>(''); // Set type explicitly to string

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/Book/Add', book);
      console.log('Book added successfully:', response.data);
      setSuccessMessage('Book added successfully!');
      setBook({
        isbn: '',
        title: '',
        author: '',
        publisher: '',
        publishYear: '',
        availableCopies: '',
      });
      setErrorMessage(''); // Reset error message
    } catch (error: any) {
      if (
        (error as AxiosError).response &&
        (error as AxiosError).response?.status === 409
      ) {
        setErrorMessage((error as AxiosError).response?.data as string); // Cast to string
      } else {
        console.error('Error adding book:', error);
      }
    }
  };

  if (role !== 'ROLE_LIBRARIAN') {
    return (
      <div>
        <h2 className="add-book-text3">Access Denied</h2>
        <p className="add-book-text2">
          You do not have permission to add a book.
        </p>
      </div>
    );
  }
  return (
    <div>
      <h2 className="add-book-text">Add Book</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message-book">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          className="isbn-input"
          value={book.isbn}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="title"
          className="title-input"
          placeholder="Title"
          value={book.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          className="author-input"
          placeholder="Author"
          value={book.author}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="publisher"
          className="publisher-input"
          placeholder="Publisher"
          value={book.publisher}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="publishYear"
          className="year-input"
          placeholder="Publish Year"
          value={book.publishYear}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="availableCopies"
          className="copies-input"
          placeholder="Available Copies"
          value={book.availableCopies}
          onChange={handleChange}
          required
        />
        <button className="add-book-button" type="submit">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBook;
