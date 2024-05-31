import React, { useState } from 'react';
import './Loan.css';
import { CircularProgress } from '@mui/material';
import LoanType from './Loan';

interface Props {
  loan: LoanType;
}

const Loan: React.FC<Props> = ({ loan }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const formatDate = (timestamp: number | null): string => {
    if (timestamp) {
      const date = new Date(timestamp);
      return date.toISOString().slice(0, 10);
    }
    return '';
  };

  const reserveLoan = () => {
    console.log('Loan reserved!');
  };

  return (
    <div className="loan-container">
      <h2
        className="medium-loan-text"
        onClick={toggleDetails}
        style={{ cursor: 'pointer' }}
      >
        Loan ID: {loan.loanId}
      </h2>
      {showDetails && (
        <div className="details-container">
          <p>
            <strong>Start Date:</strong> <br />
            {formatDate(loan.loanDateStart)}
          </p>
          <p>
            <strong>Loan period:</strong> <br />
            {loan.loanPeriod}
          </p>
          <p>
            <strong>End Date:</strong> <br />
            {loan.loanDateEnd ? formatDate(loan.loanDateEnd) : '-'}
          </p>
          <p>
            <strong>User:</strong> <br /> {loan.userId}
          </p>
          <p>
            <strong>Book:</strong> <br />
            {loan.bookId}
          </p>
          {/*<button className="remove-button" onClick={reserveLoan}>*/}
          {/*  remove loan*/}
          {/*</button>*/}
        </div>
      )}
      {loading && <CircularProgress size={20} />}
    </div>
  );
};

export default Loan;
