import React, { useState, useEffect } from 'react';
import Book from './BookComponent';
import BookType from './Book';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';

interface Props {
  title: string;
  showReserveButton: boolean;
}

const BookListComponent: React.FC<Props> = ({ title, showReserveButton }) => {
  const [books, setBooks] = useState<BookType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t, i18n } = useTranslation();
  const apiClient = useApi();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<'title' | 'author' | ''>('');

  useEffect(() => {
    const fetchAllBooks = async () => {
      setLoading(true);
      try {
        const response = await apiClient.getBooks();
        if (response.success) {
          setBooks(response.data || []);
          setError('');
        } else {
          setError('Failed to fetch books');
        }
      } catch (error) {
        setError('Error fetching books');
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, [apiClient]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value as 'title' | 'author' | '');
  };

  const handleDelete = async (loanId: number, reloadPage: () => void) => {
    const response = await apiClient.deleteLoan(loanId);
    if (response.success) {
      reloadPage();
    } else {
      setError(t('failedToDeleteBook'));
    }
  };

  const filterBooks = () => {
    if (searchQuery.trim() === '') return books;

    return books.filter((book) => {
      const query = searchQuery.toLowerCase();
      if (searchType === 'title') {
        return book.title.toLowerCase().includes(query);
      } else if (searchType === 'author') {
        return book.author.toLowerCase().includes(query);
      } else {
        return (
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query)
        );
      }
    });
  };

  const filteredBooks = filterBooks();

  return (
    <div className="book-list">
      <input
        type="text"
        className="searchInput"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder={t('findBy')}
      />
      <select
        className="searchType"
        value={searchType}
        onChange={handleSelectChange}
      >
        <option value="">{t('all')}</option>
        <option value="title">{t('title')}</option>
        <option value="author">{t('author')}</option>
      </select>
      <h1 className="details-book">{t('detailsBooks')}</h1>
      <h1 className="book-text">{t('books')}</h1>
      {loading && <div>{t('loading')}</div>}
      {error && <div>{error}</div>}
      {filteredBooks.length === 0 && !loading && (
        <div className="found-text">{t('noBooksFound')}</div>
      )}
      {filteredBooks.map((book) => (
        <Book
          key={book.bookId}
          book={book}
          showReserveButton={showReserveButton}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default BookListComponent;
