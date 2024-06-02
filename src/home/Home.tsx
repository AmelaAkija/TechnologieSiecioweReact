import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Home: React.FC = () => {
  const navigate = useNavigate();
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
      </div>
    </div>
  );
};

export default Home;
