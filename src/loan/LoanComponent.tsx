import React, { useState } from 'react';
import './Loan.css';
import { CircularProgress } from '@mui/material';
import LoanType from './Loan';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';

interface Props {
  loan: LoanType;
  onDelete: (loanId: number, callback: () => void) => void;
}

const LoanComponent: React.FC<Props> = ({ loan, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const client = useApi();
  const [error, setError] = useState<string | null>(null);
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const confirmationMessage = t('confirm-loan');
  const manageLoan = async () => {
    const confirmed = window.confirm(confirmationMessage);
    if (!confirmed) return;

    setLoading(true);
    setError(null);
    try {
      console.log('Deleting loan with ID:', loan.loanId);
      const response = await client.deleteLoan(loan.loanId);
      if (response.success) {
        console.log('loan deleted successfully');
        window.location.reload();
      } else {
        setError(t('failedToDeleteLoan'));
      }
    } catch (error) {
      console.error('Error deleting loan:', error);
      setError(t('failedToDeleteLoan'));
    }
    setLoading(false);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const localDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000,
    );
    return localDate.toISOString().split('T')[0];
  };

  return (
    <div className="loan-container">
      <h2
        className="medium-loan-text"
        onClick={toggleDetails}
        style={{ cursor: 'pointer' }}
      >
        ID: {loan.loanId}
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
            <strong>{t('period')}</strong> <br /> {loan.loanPeriod}
          </p>
          <p>
            <strong>{t('bookLoan')}</strong> <br />
            {loan.loanBookId}
          </p>
          <button className="remove-button-loan" onClick={manageLoan}>
            {t('remove')}
          </button>
        </div>
      )}
      {loading && <CircularProgress size={20} />}
    </div>
  );
};

export default LoanComponent;
