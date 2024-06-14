import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import star from '../star.svg';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const operations = [
    { name: t('addBook'), route: '/add-book' },
    { name: t('addUser'), route: '/add-user' },
    { name: t('addLoan'), route: '/add-loan' },
    { name: t('updateBook'), route: '/update-book' },
    { name: t('updateUser'), route: '/update-user' },
    { name: t('updateLoan'), route: '/update-loan' },
  ];

  return (
    <div>
      <h1 className="home-text">{t('HomeMessage')}</h1>
      <ul className="operation-list">
        {operations.map((operation) => (
          <li key={operation.route} className="operation-item">
            <button
              className="operation-button"
              onClick={() => navigate(operation.route)}
            >
              {operation.name}
            </button>
          </li>
        ))}
      </ul>
      <img src={star} alt="Star" className="star-home" />
    </div>
  );
};

export default Home;
