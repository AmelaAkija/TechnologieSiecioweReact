import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import './AddBook.css';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import Book from './Book';
import toast from 'react-hot-toast';

const AddBook = () => {
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
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const roleFromLocalStorage = localStorage.getItem('role');
    setRole(roleFromLocalStorage);

    if (roleFromLocalStorage === 'ROLE_READER') {
      console.log('no permission');
      toast.error(t('noPermissionError'));
    }
  }, []);
  if (localStorage.getItem('role') === 'ROLE_READER') {
    return null;
  }

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
      if (response.statusCode === 201) {
        toast.success(t('successBook'));
        setBook({
          isbn: '',
          title: '',
          author: '',
          publisher: '',
          publishYear: '',
          availableCopies: '',
        });
        setErrorMessage('');
      } else if (response.statusCode === 409) {
        toast.error(t('error409'));
      }
    } catch (error: any) {
      if (
        (error as AxiosError).response &&
        (error as AxiosError).response?.status === 409
      ) {
        toast.error((error as AxiosError).response?.data as string);
      } else {
        console.error('Error adding book:', error);
      }
    }
  };

  return (
    <div>
      <h2 className="add-book-text"> {t('addBook')}:</h2>
      {/*{successMessage && (*/}
      {/*  <p className="success-message-book">{t('successBook')}</p>*/}
      {/*)}*/}
      {/*{errorMessage && <p className="error-message-book">{t('error')}</p>}*/}
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
          placeholder={t('title')}
          value={book.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          className="author-input"
          placeholder={t('author')}
          value={book.author}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="publisher"
          className="publisher-input"
          placeholder={t('publisher')}
          value={book.publisher}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="publishYear"
          className="year-input"
          placeholder={t('year')}
          value={book.publishYear}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="availableCopies"
          className="copies-input"
          placeholder={t('copies')}
          value={book.availableCopies}
          onChange={handleChange}
          required
        />
        <button className="add-book-button" type="submit">
          {t('addBook')}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
