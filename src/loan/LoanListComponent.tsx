import React, { useEffect, useState } from 'react';
import Loan from './LoanComponent';
import { LibraryClient, ClientResponse } from '../api/library-client';
import LoanType from './Loan';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import { CircularProgress } from '@mui/material';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  title: string;
}

const LoanListComponent: React.FC<Props> = ({ title }) => {
  const [loans, setLoans] = useState<LoanType[]>([]);
  const [filteredLoans, setFilteredLoans] = useState<LoanType[]>([]);
  const [showFinishedLoans, setShowFinishedLoans] = useState<boolean>(false);
  const { t, i18n } = useTranslation();
  const [error, setError] = useState('');
  const apiClient = useApi();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response: ClientResponse<any> = await apiClient.getLoans();
      if (response.success) {
        setLoans(response.data);
        setLoading(false);
      } else {
        if (
          response.statusCode === 403 &&
          !localStorage.getItem('permissionErrorShown')
        ) {
          toast.error(t('noPermissionError'));
          localStorage.setItem('permissionErrorShown', 'true');
        } else {
          // toast.error(t('noPermissionError'));
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [apiClient, t]);

  useEffect(() => {
    if (showFinishedLoans) {
      const finishedLoans = loans.filter((loan) => loan.loanDateEnd !== null);
      setFilteredLoans(finishedLoans);
    } else {
      setFilteredLoans(loans);
    }
  }, [loans, showFinishedLoans]);

  const handleDelete = async (userId: number, reloadPage: () => void) => {
    const response = await apiClient.deleteLoan(userId);
    if (response.success) {
      reloadPage();
      toast.success(t('loanDeletedSuccessfully'));
    } else {
      toast.error(t('failedToDelete'));
    }
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filterOption = event.target.value;
    if (filterOption === 'all') {
      setFilteredLoans(loans);
      setShowFinishedLoans(false);
    } else if (filterOption === 'finished') {
      const finishedLoans = loans.filter((loan) => loan.loanDateEnd !== null);
      setFilteredLoans(finishedLoans);
      setShowFinishedLoans(true);
    } else if (filterOption === 'unfinished') {
      const unfinishedLoans = loans.filter((loan) => loan.loanDateEnd === null);
      setFilteredLoans(unfinishedLoans);
      setShowFinishedLoans(false);
    } else if (filterOption === 'unfinishedNull') {
      const unfinishedNullLoans = loans.filter(
        (loan) => loan.loanDateEnd == null,
      );
      setFilteredLoans(unfinishedNullLoans);
      setShowFinishedLoans(false);
    }
  };

  return (
    <div className="loan-list">
      <Toaster />
      <h1 className="details-loan">{t('detailsLoans')}</h1>
      <h1 className="loan-text">{t('loans')}</h1>
      <div style={{ marginBottom: '10px' }}>
        <select className="choose-loan-type" onChange={handleFilterChange}>
          <option value="all">{t('allLoans')}</option>
          <option value="finished">{t('finishedLoans')}</option>
          <option value="unfinished">{t('unfinishedLoans')}</option>
          <option value="unfinishedNull">
            {t('unfinishedWithNullEndDate')}
          </option>
        </select>
      </div>
      {loading ? (
        <CircularProgress />
      ) : (
        filteredLoans.map((loan) => (
          <div key={loan.loanId} className="loan-container">
            <Loan loan={loan} onDelete={handleDelete} />
          </div>
        ))
      )}
    </div>
  );
};

export default LoanListComponent;
