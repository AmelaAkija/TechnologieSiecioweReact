import React, { useEffect, useState } from 'react';
import Book from './BookComponent';
import BookType from './Book';
import { LibraryClient, ClientResponse } from '../api/library-client';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';

interface Props {
  title: string;
  showReserveButton: boolean;
}

const BookListComponent: React.FC<Props> = ({ title, showReserveButton }) => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t, i18n } = useTranslation();
  const apiClient = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const response: ClientResponse<any> = await apiClient.getBooks();
      if (response.success) {
        setBooks(response.data);
      } else {
        setError('Failed to fetch books');
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="book-list">
      <h1 className="details-book"> {t('detailsBooks')}</h1>
      <h1 className="book-text">{t('books')}</h1>
      {books.map((book) => (
        <Book
          key={book.bookId}
          book={book}
          showReserveButton={showReserveButton}
        />
      ))}
    </div>
  );
};

export default BookListComponent;
