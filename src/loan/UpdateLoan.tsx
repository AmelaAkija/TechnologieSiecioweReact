import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import './AddLoan.css';
import Loan from './Loan';

const UpdateLoan = () => {
  const [loanList, setLoanList] = useState<Loan[]>([]);
  const [selectedLoanId, setSelectedLoanId] = useState<number | null>(null);
  const [loanDetails, setLoanDetails] = useState<Loan | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>(''); // Changed to empty string for initial state
  const { t } = useTranslation();
  const clientApi = useApi();

  useEffect(() => {
    fetchLoans();
  }, []);

  const fetchLoans = async () => {
    try {
      const response = await clientApi.getLoans();
      setLoanList(response.data);
    } catch (error) {
      console.error('Error fetching loan list:', error);
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
      }
    } catch (error) {
      console.error('Error fetching loan details:', error);
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
        setErrorMessage('Please select a loan end date.');
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
            setSuccessMessage(
              'Loan updated successfully! Book returned after the allowed period.',
            );
          } else {
            setSuccessMessage(
              'Loan updated successfully! Book returned on time.',
            );
          }
          setErrorMessage('');
        } else {
          setErrorMessage('Failed to update loan');
        }
      } catch (error: any) {
        console.error('Error updating loan:', error);
        setErrorMessage('Failed to update loan');
      }
    } else {
      setErrorMessage('Please select a loan to update.');
    }
  };

  return (
    <div>
      <h2 className="add-user-text">{t('UpdateUser')}</h2>
      {successMessage && (
        <p className="success-message-user">{successMessage}</p>
      )}
      {errorMessage && <p className="error-message-user">{errorMessage}</p>}

      <select
        className="choose-user"
        onChange={handleLoanSelect}
        value={selectedLoanId || ''}
      >
        <option value="" disabled>
          {t('SelectUser')}
        </option>
        {loanList.map((loan) => (
          <option key={loan.loanId} value={loan.loanId}>
            ({loan.loanId})
          </option>
        ))}
      </select>

      {loanDetails && (
        <form onSubmit={handleSubmit}>
          <input
            type="date"
            name="loanDateEnd"
            placeholder={t('loanDateEnd')}
            className="loan-input"
            value={loanDetails.loanDateEnd || ''}
            onChange={handleChange}
          />

          <button className="update-loan-button" type="submit">
            {t('UpdateLoan')}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateLoan;
