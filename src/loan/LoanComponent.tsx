import React, { useState } from 'react';
import './Loan.css';
import { CircularProgress } from '@mui/material';
import LoanType from './Loan';
import { useTranslation } from 'react-i18next';

interface Props {
  loan: LoanType;
}

const Loan: React.FC<Props> = ({ loan }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const reserveLoan = () => {
    console.log('Loan reserved!');
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000,
    );
    const formattedDate = localDate.toISOString().split('T')[0];
    return formattedDate;
  };

  return (
    <div className="loan-container">
      <h2
        className="medium-loan-text"
        onClick={toggleDetails}
        style={{ cursor: 'pointer' }}
      >
        ID: {loan.id}
      </h2>
      {showDetails && (
        <div className="details-container">
          <p>
            <strong>{t('loanDateStart')}:</strong> <br />
            {formatDate(loan.loanDateStart)}
          </p>
          <p>
            <strong>{t('loanDateEnd')}:</strong> <br />
            {formatDate(loan.loanDateEnd)}
          </p>
          <p>
            <strong>{t('userLoan')}</strong> <br /> {loan.loanUserId}
          </p>
          <p>
            <strong>{t('bookLoan')}</strong> <br />
            {loan.loanBookId}
          </p>
          <button className="remove-button" onClick={reserveLoan}>
            remove loan
          </button>
        </div>
      )}
      {loading && <CircularProgress size={20} />}
    </div>
  );
};

export default Loan;
