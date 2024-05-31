import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookListComponent from './book/BookListComponent';
import mockBooks from './book/mockData';
import LoginForm from './login-form/LoginForm';
import Navbar from './components/Navbar';
import LoanListComponent from './loan/LoanListComponent';
import mockDataLoan from './loan/mockDataLoan';
import Home from './home/Home';
import mockLoans from './loan/mockDataLoan';
import ReaderHome from './READER/reader-home/ReaderHome';
import AddBook from './book/AddBook';

import AddUser from './users/AddUser';
import AddLoan from './loan/AddLoan';

function App() {
  const [role, setRole] = useState('');

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const setRoleFromLogin = (newRole: string) => {
    setRole(newRole);
  };

  return (
    <Router>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<LoginForm setRole={setRoleFromLogin} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home-reader" element={<ReaderHome />} />
        <Route path="/add-book" element={<AddBook role={role} />} />
        <Route path="/add-user" element={<AddUser role={role} />} />
        <Route path="/add-loan" element={<AddLoan role={role} />} />
        <Route
          path="/loan-list"
          element={<LoanListComponent title={'Loans'} />}
        />
        <Route
          path="/book-list"
          element={
            <BookListComponent title={'Book list'} showReserveButton={true} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
