import React, { useEffect, useState } from 'react';
import Loan from './LoanComponent';
import { LibraryClient, ClientResponse } from '../api/library-client'; // Import your LibraryClient and ClientResponse
import LoanType from './Loan'; // Import your LoanType
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';

interface Props {
  title: string;
}

const LoanListComponent: React.FC<Props> = ({ title }) => {
  const [loans, setLoans] = useState<LoanType[]>([]);
  const { t, i18n } = useTranslation();
  const apiClient = useApi();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response: ClientResponse<any> = await apiClient.getLoans();
        if (response.success) {
          setLoans(response.data);
        } else {
          console.error('Error fetching loans:', response.data);
        }
      } catch (error) {
        console.error('Error fetching loans:', error);
      }
    };

    fetchLoans();
  }, []);

  return (
    <div className="loan-list">
      <h1 className="loan-text">{t('loans')}</h1>
      {loans.map((loan) => (
        <Loan key={loan.loanId} loan={loan} />
      ))}
    </div>
  );
};

export default LoanListComponent;
