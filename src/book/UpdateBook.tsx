// UpdateBook.tsx or similar

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import Book from './Book';
import './AddBook.css';
import toast from 'react-hot-toast';

const UpdateBook = () => {
  const [bookList, setBookList] = useState<Book[]>([]);
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [bookDetails, setBookDetails] = useState<Book | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { t } = useTranslation();
  const clientApi = useApi();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await clientApi.getBooks();
      setBookList(response.data);
    } catch (error) {
      console.error('Error fetching book list:', error);
    }
  };

  const fetchBookDetails = async (bookId: number) => {
    try {
      const response = await clientApi.getBookById(bookId);
      if (response.success) {
        console.log('Fetched book details:', response.data);
        setBookDetails(response.data);
      } else {
        console.error('Failed to fetch book details:', response);
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const handleBookSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const bookId = parseInt(e.target.value, 10);
    setSelectedBookId(bookId);
    fetchBookDetails(bookId);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (bookDetails) {
      setBookDetails({
        ...bookDetails,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (bookDetails && selectedBookId !== null) {
      try {
        const response = await clientApi.updateBook(
          selectedBookId,
          bookDetails,
        );
        console.log(selectedBookId);
        if (response.success) {
          toast.success(t('updated'));
          // setSuccessMessage('Book updated successfully!');
          setErrorMessage('');
        } else {
          // setErrorMessage('Failed to update book');
          toast.error(t('errorUpdate'));
        }
      } catch (error: any) {
        console.error('Error updating book:', error);
        toast.error(t('errorUpdate'));
      }
    }
  };

  return (
    <div>
      <h2 className="add-book-text">{t('updateBook')}</h2>
      {/*{successMessage && (*/}
      {/*  <p className="success-message-book">{successMessage}</p>*/}
      {/*)}*/}
      {/*{errorMessage && <p className="error-message-book">{errorMessage}</p>}*/}

      <select
        className="choose-book"
        onChange={handleBookSelect}
        value={selectedBookId || ''}
      >
        <option value="" disabled>
          {t('selectBook')}
        </option>
        {bookList.map((book) => (
          <option key={book.bookId} value={book.bookId}>
            {book.title} ({book.bookId})
          </option>
        ))}
      </select>

      {bookDetails && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="isbn"
            placeholder="ISBN"
            className="isbn-input"
            value={bookDetails?.isbn || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="title"
            className="title-input"
            placeholder={t('Title')}
            value={bookDetails?.title || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="author"
            className="author-input"
            placeholder={t('Author')}
            value={bookDetails?.author || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="publisher"
            className="publisher-input"
            placeholder={t('Publisher')}
            value={bookDetails?.publisher || ''}
            onChange={handleChange}
          />
          <input
            type="number"
            name="publishYear"
            className="year-input"
            placeholder={t('Year')}
            value={bookDetails?.publishYear || ''}
            onChange={handleChange}
          />
          <input
            type="number"
            name="availableCopies"
            className="copies-input"
            placeholder={t('Copies')}
            value={bookDetails?.availableCopies || ''}
            onChange={handleChange}
          />
          <button className="update-book-button" type="submit">
            {t('UpdateBook')}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateBook;
