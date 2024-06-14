import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import './AddLoan.css';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import Loan from './Loan';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';

const AddLoan = () => {
  const [loan, setLoan] = useState({
    loanDateStart: '',
    loanPeriod: '',
    loanDateEnd: null,
    loanUserId: '',
    loanBookId: '',
  });
  const { t } = useTranslation();
  const clientApi = useApi();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const roleFromLocalStorage = localStorage.getItem('role');
    setRole(roleFromLocalStorage);

    if (roleFromLocalStorage === 'ROLE_READER') {
      console.log('no permission');
      toast.error(t('noPermissionError'));
    }
  }, []);
  if (localStorage.getItem('role') === 'ROLE_READER') {
    return null;
  }

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
      if (response.statusCode === 201) {
        toast.success(t('successLoan'));
        setLoan({
          loanDateStart: '',
          loanPeriod: '',
          loanDateEnd: null,
          loanUserId: '',
          loanBookId: '',
        });
      } else if (response.statusCode === 400) {
        toast.error(t('error400'));
      } else if (response.statusCode === 404) {
        toast.error(t('error404'));
      } else {
        toast.error(t('error'));
      }
    } catch (error: unknown) {
      console.error('Error adding loan:', error);
      if (
        (error as AxiosError).response &&
        (error as AxiosError).response?.status === 404
      ) {
        toast.error(t('error404'));
      } else if (
        (error as AxiosError).response &&
        (error as AxiosError).response?.status === 400
      ) {
        toast.error(t('error400'));
      } else {
        toast.error(t('error'));
      }
    }
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div>
      <h2 className="add-loan-text">{t('AddLoan')}:</h2>
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
