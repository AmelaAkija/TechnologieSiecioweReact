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
        Loan ID: {loan.id}
      </h2>
      {showDetails && (
        <div className="details-container">
          <p>
            <strong>Start Date:</strong> <br />
            {loan.loanDateStart}
          </p>
          <p>
            <strong>End Date:</strong> <br />
            {loan.loanDateEnd}
          </p>
          <p>
            <strong>User:</strong> <br /> {loan.userLoan}
          </p>
          <p>
            <strong>Book:</strong> <br />
            {loan.bookLoan}
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
