import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import axios from 'axios';
import './AddUser.css';
import { useTranslation } from 'react-i18next';
import Book from '../book/Book';
import { useApi } from '../api/ApiProvider';
import User from './User';
import toast from 'react-hot-toast';

const AddUser = () => {
  const [user, setUser] = useState({
    username: '',
    password: '',
    mail: '',
    fullusername: '',
    role: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { t, i18n } = useTranslation();
  const clientApi = useApi();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const roleFromLocalStorage = localStorage.getItem('role');
    setRole(roleFromLocalStorage);

    if (roleFromLocalStorage === 'ROLE_READER') {
      console.log('no permission');
      // toast.error(t('noPermissionError'));
    }
  }, []);
  if (localStorage.getItem('role') === 'ROLE_READER') {
    toast.error(t('noPermissionError'));
    return null;
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await clientApi.addUser(user as unknown as User);
      console.log('User added successfully:', response.data);
      toast.success(t('successUser'));
      setUser({
        username: '',
        password: '',
        mail: '',
        fullusername: '',
        role: '',
      });
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(error.response.data);
      } else {
        toast.error(t('error'));
      }
    }
  };

  return (
    <div>
      <h2 className="add-user-text">{t('AddUser')}:</h2>
      {/*{successMessage && (*/}
      {/*  <p className="success-message-user">{t('successUser')}</p>*/}
      {/*)}*/}
      {/*{errorMessage && <p className="error-message">{t('error')}</p>}*/}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder={t('username')}
          className="username-input"
          value={user.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="password-input"
          placeholder={t('password')}
          value={user.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mail"
          className="mail-input"
          placeholder="Email"
          value={user.mail}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="fullusername"
          className="fullusername-input"
          placeholder={t('fullusername')}
          value={user.fullusername}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          className="role-input"
          placeholder={t('role')}
          value={user.role}
          onChange={handleChange}
          required
        />
        <button className="add-user-button" type="submit">
          {t('AddUser')}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
