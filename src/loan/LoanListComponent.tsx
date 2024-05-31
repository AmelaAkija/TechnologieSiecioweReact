import React, { useEffect, useState } from 'react';
import Loan from './LoanComponent';
import { fetchLoans } from './LoanService';
import { Loan as LoanType } from './Loan';

interface Props {
  title: string;
}

const LoanListComponent: React.FC<Props> = ({ title }) => {
  const [loans, setLoans] = useState<LoanType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getLoans = async () => {
      try {
        const fetchedLoans = await fetchLoans();
        console.log('Fetched loans:', fetchedLoans); // Add logging
        setLoans(fetchedLoans);
      } catch (error) {
        setError('Failed to fetch loans');
      } finally {
        setLoading(false);
      }
    };

    getLoans();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!Array.isArray(loans)) {
    return <div>Unexpected response format</div>;
  }

  return (
    <div className="loan-list">
      <h1 className="loan-text">{title}</h1>
      {loans.map((loan) => (
        <Loan key={loan.loanId} loan={loan} />
      ))}
    </div>
  );
};

export default LoanListComponent;
