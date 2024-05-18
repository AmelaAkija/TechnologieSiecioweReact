import React, { useState } from 'react';
import BookType from './Book';
import './Book.css';
import { CircularProgress } from '@mui/material';

interface Props {
  book: BookType;
}

const BookComponent: React.FC<Props> = ({ book }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
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
            <strong>Publisher:</strong> <br />
            {book.publisher}
          </p>
          <p>
            <strong>Published Year:</strong> <br /> {book.publishYear}
          </p>
          <p>
            <strong>Available Copies:</strong> <br />
            {book.availableCopies}
          </p>
          <button className="reserve-button">Reserve</button>
        </div>
      )}
      {loading && <CircularProgress size={20} />}
    </div>
  );
};

export default BookComponent;
