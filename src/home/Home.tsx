import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

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
      <h1 className="home-text">Welcome to Library System!</h1>
      <div className="button-container">
        <button className="book-button" onClick={handleAddBook}>
          Add Book
        </button>
        <button className="user-button" onClick={handleAddUser}>
          Add User
        </button>
        <button className="loan-button" onClick={handleAddLoan}>
          Add Loan
        </button>
      </div>
    </div>
  );
};

export default Home;
