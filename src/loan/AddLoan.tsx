import React, { useState, ChangeEvent, FormEvent } from 'react';
import './AddLoan.css';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import Loan from './Loan';

const AddLoan = () => {
  const [loan, setLoan] = useState({
    loanDateStart: '',
    loanPeriod: '',
    loanDateEnd: null,
    loanUserId: '',
    loanBookId: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();
  const clientApi = useApi();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoan((prevLoan) => ({
      ...prevLoan,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await clientApi.addLoan(loan as unknown as Loan);
      console.log('Loan added successfully:', response.data);
      setSuccessMessage(t('successLoan'));
      setLoan({
        loanDateStart: '',
        loanPeriod: '',
        loanDateEnd: null,
        loanUserId: '',
        loanBookId: '',
      });
      setErrorMessage('');
    } catch (error) {
      console.error('Error adding loan:', error);
      setErrorMessage(t('error'));
    }
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h2 className="add-loan-text">{t('AddLoan')}:</h2>
      {successMessage && (
        <p className="success-message-loan">{successMessage}</p>
      )}
      {errorMessage && <p className="error-message-loan">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="loanDateStart"
          placeholder={t('loanDateStart')}
          className="loanDateStart-input"
          value={loan.loanDateStart}
          onChange={handleChange}
          min={currentDate}
          max={currentDate}
          required
        />
        <input
          type="number"
          name="loanPeriod"
          className="loanPeriod-input"
          placeholder={t('loanPeriod')}
          value={loan.loanPeriod}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="loanUserId"
          className="userId-input"
          placeholder={t('userLoan')}
          value={loan.loanUserId}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="loanBookId"
          className="bookId-input"
          placeholder={t('bookLoan')}
          value={loan.loanBookId}
          onChange={handleChange}
          required
        />
        <button className="add-loan-button" type="submit">
          {t('AddLoan')}
        </button>
      </form>
    </div>
  );
};

export default AddLoan;
