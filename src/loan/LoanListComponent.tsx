import React, { useEffect, useState } from 'react';
import Loan from './LoanComponent';
import { LibraryClient, ClientResponse } from '../api/library-client';
import LoanType from './Loan'; // Import your LoanType
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';

interface Props {
  title: string;
}

const LoanListComponent: React.FC<Props> = ({ title }) => {
  const [loans, setLoans] = useState<LoanType[]>([]);
  const { t, i18n } = useTranslation();
  const [error, setError] = useState('');
  const apiClient = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const response: ClientResponse<any> = await apiClient.getLoans();
      if (response.success) {
        setLoans(response.data);
      } else {
        setError('Failed to fetch loans');
      }
      // setLoading(false);
    };

    fetchData();
  }, []);

  const handleDelete = async (userId: number, reloadPage: () => void) => {
    const response = await apiClient.deleteUser(userId);
    if (response.success) {
      reloadPage();
    } else {
      setError(t('failedToDeleteUser'));
    }
  };

  return (
    <div className="loan-list">
      <h1 className="details-loan"> {t('detailsLoans')}</h1>
      <h1 className="loan-text">{t('loans')}</h1>
      {loans.map((loan) => (
        <div key={loan.loanId} className="loan-container">
          <Loan loan={loan} onDelete={handleDelete} />
          <div className="details-loan">{t('detailsLoans')}</div>
        </div>
      ))}
    </div>
  );
};

export default LoanListComponent;
