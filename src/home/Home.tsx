import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import { LibraryClient } from '../api/library-client';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const apiClient = useApi();

  // apiClient
  //   .getRole()
  //   .then((response) => {
  //     if (response.success) {
  //       console.log('User role:', response.data);
  //     } else {
  //       console.error('Failed to get user role:', response.statusCode);
  //     }
  //   })
  //   .catch((err) => {
  //     console.error('Error:', err);
  //   });

  const { t } = useTranslation();

  const handleAddBook = () => {
    navigate('/add-book');
  };

  const handleAddUser = () => {
    navigate('/add-user');
  };

  const handleAddLoan = () => {
    navigate('/add-loan');
  };
  const handleUpdateBook = () => {
    navigate('/update-book');
  };
  const handleUpdateUser = () => {
    navigate('/update-user');
  };

  return (
    <div>
      <h1 className="home-text">{t('HomeMessage')}</h1>
      <div className="button-container">
        <button className="book-button" onClick={handleAddBook}>
          {t('AddBook')}
        </button>
        <button className="user-button" onClick={handleAddUser}>
          {t('AddUser')}
        </button>
        <button className="loan-button" onClick={handleAddLoan}>
          {t('AddLoan')}
        </button>
        <button className="book-button-update" onClick={handleUpdateBook}>
          {t('UpdateBook')}
        </button>
        <button className="user-button-update" onClick={handleUpdateUser}>
          {t('UpdateUser')}
        </button>
      </div>
    </div>
  );
};

export default Home;
