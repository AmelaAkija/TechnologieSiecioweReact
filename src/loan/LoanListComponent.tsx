import React, { useEffect, useState } from 'react';
import LoanType from './Loan';
import Loan from './LoanComponent';
import { fetchLoans } from './loanService';
import BookType from '../book/Book';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
}

const LoanListComponent: React.FC<Props> = ({ title }) => {
  const [loans, setLoans] = useState<LoanType[]>([]);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    // Fetch loans when component mounts
    async function fetchAndSetLoans() {
      try {
        const fetchedLoans = await fetchLoans();
        setLoans(fetchedLoans);
      } catch (error) {
        // Handle error
        console.error('Error fetching loans:', error);
      }
    }

    fetchAndSetLoans();
  }, []);

  return (
    <div className="loan-list">
      <h1 className="loan-text">{t('loans')}</h1>
      {loans.map((loan) => (
        <Loan key={loan.id} loan={loan} />
      ))}
    </div>
  );
};

export default LoanListComponent;
