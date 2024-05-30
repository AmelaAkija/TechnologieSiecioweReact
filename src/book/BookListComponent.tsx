import React, { useEffect, useState } from 'react';
import Book from './BookComponent';
import { fetchBooks } from './bookService';
import BookType from './Book';

interface Props {
  title: string;
  showReserveButton: boolean;
}

const BookListComponent: React.FC<Props> = ({ title, showReserveButton }) => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getBooks = async () => {
      try {
        const books = await fetchBooks();
        console.log('Fetched books:', books); // Add logging
        setBooks(Array.isArray(books) ? books : []);
      } catch (error) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    getBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(books)) {
    return <div>Unexpected response format</div>;
  }

  return (
    <div className="book-list">
      <h1 className="book-text">{title}</h1>
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
