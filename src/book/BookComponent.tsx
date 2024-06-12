import React, { useEffect, useState } from 'react';
import BookType from './Book';
import './Book.css';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';

interface Props {
  book: BookType;
  showReserveButton: boolean;
  onDelete: (bookId: number, callback: () => void) => void;
}

const Book: React.FC<Props> = ({ book, showReserveButton }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const [userRole, setUserRole] = useState('');
  const client = useApi();
  const [error, setError] = useState<string | null>(null);
  const toggleDetails = () => {
    if (!showDetails) {
      // setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowDetails(true);
      }, 1000);
    } else {
      setShowDetails(false);
    }
  };
  useEffect(() => {
    const role = localStorage.getItem('role');
    if (role) {
      setUserRole(role);
    }
  }, []);
  const confirmationMessage = t('confirm-book');
  const manageBook = async () => {
    const confirmed = window.confirm(confirmationMessage);
    if (!confirmed) return;

    setLoading(true);
    setError(null);
    try {
      console.log('Deleting book with ID:', book.bookId);
      const response = await client.deleteBook(book.bookId);
      if (response.success) {
        console.log('Book deleted successfully');
        window.location.reload();
      } else {
        setError(t('failedToDeleteBook'));
      }
    } catch (error) {
      console.error('Error deleting book:', error);
      setError(t('failedToDeleteBook'));
    }
    setLoading(false);
  };
  return (
    <div className="book-container">
      <h2
        className="medium-book-text"
        onClick={toggleDetails}
        style={{ cursor: 'pointer' }}
      >
        {book.title}
        <h2 className="small-book-text" style={{ fontWeight: 'normal' }}>
          <p>{book.author}</p>
        </h2>
      </h2>
      {showDetails && (
        <div className="details-container">
          <p>
            <strong>ISBN:</strong> <br />
            {book.isbn}
          </p>
          <p>
            <strong>{t('Publisher')}</strong> <br />
            {book.publisher}
          </p>
          <p>
            <strong>{t('Year')}</strong> <br /> {book.publishYear}
          </p>
          <p>
            <strong>{t('Copies')}</strong> <br />
            {book.availableCopies}
          </p>
          {showReserveButton && userRole === 'ROLE_LIBRARIAN' && (
            <button className="remove-button" onClick={manageBook}>
              {t('remove')}
            </button>
          )}
        </div>
      )}
      {loading && <CircularProgress size={20} />}
    </div>
  );
};

export default Book;
