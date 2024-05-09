import React, { useState } from 'react';
import BookType from './Book';
import './Book.css';
import { CircularProgress } from '@mui/material';

interface Props {
  book: BookType;
}

const Book: React.FC<Props> = ({ book }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDetails = () => {
    if (!showDetails) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setShowDetails(true);
      }, 1000);
    } else {
      setShowDetails(false);
    }
  };

  return (
    <div className="book-container">
      {' '}
      {/* Use book-container class */}
      <h2
        className="medium-book-text"
        onClick={toggleDetails}
        style={{ cursor: 'pointer' }}
      >
        {book.title}
      </h2>
      {showDetails && (
        <div className="small-book-text">
          <p>
            <strong>Author:</strong> {book.author}
          </p>
          <p>
            <strong>ISBN:</strong> {book.isbn}
          </p>
          <p>
            <strong>Publisher:</strong> {book.publisher}
          </p>
          <p>
            <strong>Published Year:</strong> {book.publishYear}
          </p>
          <p>
            <strong>Available Copies:</strong> {book.availableCopies}
          </p>
        </div>
      )}
      {loading && <CircularProgress size={20} />}{' '}
    </div>
  );
};

export default Book;
