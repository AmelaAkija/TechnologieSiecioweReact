import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import './AddLoan.css';
import Loan from './Loan';
import toast from 'react-hot-toast';

const UpdateLoan = () => {
  const [loanList, setLoanList] = useState<Loan[]>([]);
  const [selectedLoanId, setSelectedLoanId] = useState<number | null>(null);
  const [loanDetails, setLoanDetails] = useState<Loan | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { t } = useTranslation();
  const clientApi = useApi();
  const [roleFromLocalStorage, setRole] = useState<string | null>(null);

  useEffect(() => {
    fetchLoans();
  }, []);

  useEffect(() => {
    const roleFromLocalStorage = localStorage.getItem('role');
    setRole(roleFromLocalStorage);

    if (roleFromLocalStorage === 'ROLE_READER') {
      console.log('no permission');
    }
  }, []);
  if (roleFromLocalStorage === 'ROLE_READER') {
    toast.error(t('noPermissionError'));
    return null;
  }

  const fetchLoans = async () => {
    try {
      const response = await clientApi.getLoans();
      setLoanList(response.data);
    } catch (error) {
      toast.error(t('error'));
    }
  };

  const fetchLoanDetails = async (loanId: number) => {
    try {
      const response = await clientApi.getLoanById(loanId);
      console.log('Fetch Loan Details Response:', response);
      if (response.success) {
        setLoanDetails(response.data);
      } else {
        console.error('Failed to fetch loan details:', response);
        toast.error(t('error'));
      }
    } catch (error) {
      console.error('Error fetching loan details:', error);
      toast.error(t('error'));
    }
  };

  const handleLoanSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const loanId = parseInt(e.target.value, 10);
    console.log('Selected Loan ID:', loanId);
    setSelectedLoanId(loanId);
    fetchLoanDetails(loanId);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log('handleChange:', name, value);
    if (loanDetails) {
      setLoanDetails({
        ...loanDetails,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loanDetails && selectedLoanId !== null) {
      if (!loanDetails.loanDateEnd) {
        toast.error(t('errorEndDate'));
        // setErrorMessage('Please select a loan end date.');
        return;
      }

      const startDate = new Date(loanDetails.loanDateStart);
      const endDate = new Date(loanDetails.loanDateEnd);
      const period = loanDetails.loanPeriod;
      const endDateFromStartDate = new Date(startDate);
      endDateFromStartDate.setDate(startDate.getDate() + period);

      try {
        const response = await clientApi.updateLoan(
          selectedLoanId,
          loanDetails,
        );
        if (response.success) {
          if (endDate > endDateFromStartDate) {
            toast.success(t('afterTime'));
          } else {
            toast.success(t('onTime'));
          }
          // toast.error(t('error'));
        } else {
          toast.error(t('errorUpdate'));
        }
      } catch (error: any) {
        console.error('Error updating loan:', error);
        toast.error(t('errorUpdate'));
      }
    } else {
      toast.error(t('selectUpdateError'));
    }
  };

  return (
    <div>
      <h2 className="add-user-text">{t('updateLoan')}</h2>
      {successMessage && (
        <p className="success-message-user">{successMessage}</p>
      )}
      {errorMessage && <p className="error-message-user">{errorMessage}</p>}

      <select
        className="choose-loan"
        onChange={handleLoanSelect}
        value={selectedLoanId || ''}
      >
        <option value="" disabled>
          {t('selectLoan')}
        </option>
        {loanList.map((loan) => (
          <option key={loan.loanId} value={loan.loanId}>
            {loan.loanId}
          </option>
        ))}
      </select>

      {loanDetails && (
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="loanDateEnd"
            placeholder={t('loanDateEnd')}
            className="loanDateEnd-input-update"
            value={loanDetails.loanDateEnd || ''}
            onChange={handleChange}
          />

          <button className="add-loan-button" type="submit">
            {t('updateLoan')}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateLoan;
