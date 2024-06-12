import React, { useState } from 'react';
import './Book.css';
import { useTranslation } from 'react-i18next';
import BorrowedBook from './BorrowedBook';
import { CircularProgress } from '@mui/material';

interface BorrowedBookProps {
  borrowedBook: BorrowedBook;
}

const BorrowedBookComponent: React.FC<BorrowedBookProps> = ({
  borrowedBook,
}) => {
  const { title, loanDateStart, loanDateEnd } = borrowedBook;
  const { t } = useTranslation();
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
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

  return (
    <div className="book-container">
      <h2
        className="medium-book-text"
        onClick={toggleDetails}
        style={{ cursor: 'pointer' }}
      >
        {borrowedBook.title}
      </h2>
      {showDetails && (
        <div className="details-container">
          <p>
            <strong>{t('loanDateStart')}</strong> <br />
            {borrowedBook.loanDateStart}
          </p>
          <p>
            <strong>{t('loanDateEnd')}</strong> <br />
            {borrowedBook.loanDateEnd}
          </p>
        </div>
      )}
      {loading && <CircularProgress size={20} />}
    </div>
  );
};

export default BorrowedBookComponent;
