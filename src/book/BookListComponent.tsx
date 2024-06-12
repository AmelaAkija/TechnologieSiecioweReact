import React, { useState, useEffect } from 'react';
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { t, i18n } = useTranslation();
  const apiClient = useApi();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchType, setSearchType] = useState<'title' | 'author' | ''>('');
  const [searchedBooks, setSearchedBooks] = useState<BookType[]>([]);
  const [searched, setSearched] = useState(false);

  // Function to fetch books based on search criteria
  const fetchBooks = async () => {
    setLoading(true);
    try {
      let response: ClientResponse<any>;

      if (searchType === 'title') {
        response = await apiClient.getBooksByTitle(searchQuery);
      } else if (searchType === 'author') {
        response = await apiClient.getBooksByAuthor(searchQuery);
      } else {
        response = await apiClient.getBooks(); // Fetch all books
      }

      if (response.success) {
        setSearchedBooks(response.data || []);
        setError('');
      } else {
        setError('Failed to fetch books');
      }
    } catch (error) {
      setError('Error fetching books');
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  // Function to handle search button click
  const handleSearch = async () => {
    if (searchQuery.trim() !== '') {
      await fetchBooks();
    } else {
      setSearchedBooks([]);
      setSearched(true);
    }
  };

  // Function to handle input change in search box
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle select change for search type
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(event.target.value as 'title' | 'author' | '');
    setSearched(false); // Reset searched state when changing search type
  };

  // Event handler for deleting a loan (assuming it's relevant to book loans)
  const handleDelete = async (loanId: number, reloadPage: () => void) => {
    const response = await apiClient.deleteLoan(loanId);
    if (response.success) {
      reloadPage();
    } else {
      setError(t('failedToDeleteBook'));
    }
  };

  // useEffect to fetch all books when component mounts or when searchType changes to ''
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

    if (searchType === '') {
      fetchAllBooks();
    }
  }, [searchType]);

  // Determine which set of books to render based on search state
  const booksToRender = searched ? searchedBooks : books;

  return (
    <div className="book-list">
      <input
        type="text"
        className="searchInput"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search by title..."
      />
      <select
        className="searchType"
        value={searchType}
        onChange={handleSelectChange}
      >
        <option value="">All</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      <h1 className="details-book">{t('detailsBooks')}</h1>
      <h1 className="book-text">{t('books')}</h1>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {searched && booksToRender.length === 0 && (
        <div className="found-text">No books found</div>
      )}
      {booksToRender.map((book) => (
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
