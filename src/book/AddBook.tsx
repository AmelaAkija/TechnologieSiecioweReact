import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios, { AxiosError } from 'axios';
import './AddBook.css';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import Book from './Book';

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
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { t, i18n } = useTranslation();
  const clientApi = useApi();

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
      const response = await clientApi.addBook(book as unknown as Book);
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
      setErrorMessage('');
    } catch (error: any) {
      if (
        (error as AxiosError).response &&
        (error as AxiosError).response?.status === 409
      ) {
        setErrorMessage((error as AxiosError).response?.data as string);
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
      <h2 className="add-book-text"> {t('AddBook')}:</h2>
      {successMessage && (
        <p className="success-message-book">{t('successBook')}</p>
      )}
      {errorMessage && <p className="error-message-book">{t('error')}</p>}
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
          placeholder={t('Title')}
          value={book.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          className="author-input"
          placeholder={t('Author')}
          value={book.author}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="publisher"
          className="publisher-input"
          placeholder={t('Publisher')}
          value={book.publisher}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="publishYear"
          className="year-input"
          placeholder={t('Year')}
          value={book.publishYear}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="availableCopies"
          className="copies-input"
          placeholder={t('Copies')}
          value={book.availableCopies}
          onChange={handleChange}
          required
        />
        <button className="add-book-button" type="submit">
          {t('AddBook')}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
