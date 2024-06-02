import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './AddLoan.css';
import { useTranslation } from 'react-i18next';

const AddLoan = ({ role }: { role: string }) => {
  const [loan, setLoan] = useState({
    loanDateStart: '',
    loanPeriod: '',
    loanDateEnd: null,
    loanUserId: '',
    loanBookId: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { t, i18n } = useTranslation();

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
      const response = await axios.post('http://localhost:8080/Loan/Add', loan);
      console.log('Loan added successfully:', response.data);
      setSuccessMessage('Loan added successfully!');
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
      setErrorMessage('Error adding loan. Please try again.');
    }
  };

  if (role !== 'ROLE_LIBRARIAN') {
    return (
      <div>
        <h2 className="add-loan-text3">Access Denied</h2>
        <p className="add-loan-text2">
          You do not have permission to add a loan.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="add-loan-text">{t('AddLoan')}:</h2>
      {successMessage && (
        <p className="success-message-loan">{t('successLoan')}</p>
      )}
      {errorMessage && <p className="error-message-loan">{t('error')}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="loanDateStart"
          placeholder={t('loanDateStart')}
          className="loanDateStart-input"
          value={loan.loanDateStart}
          onChange={handleChange}
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
