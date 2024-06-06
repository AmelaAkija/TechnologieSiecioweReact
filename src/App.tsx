import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookListComponent from './book/BookListComponent';
import LoginForm from './login-form/LoginForm';
import Navbar from './components/Navbar';
import LoanListComponent from './loan/LoanListComponent';

import Home from './home/Home';
import mockLoans from './loan/mockDataLoan';
import ReaderHome from './READER/reader-home/ReaderHome';
import AddBook from './book/AddBook';
import AddUser from './users/AddUser';
import AddLoan from './loan/AddLoan';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import ApiProvider from './api/ApiProvider';
function App() {
  const role = 'ROLE_LIBRARIAN';

  return (
    <Router>
      <ApiProvider>
        <I18nextProvider i18n={i18n}>
          <Navbar role={role} />
          <Routes>
            <Route path="/" element={<LoginForm />} />
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
                <BookListComponent
                  title={'Book list'}
                  showReserveButton={true}
                />
              }
            />
          </Routes>
        </I18nextProvider>
      </ApiProvider>
    </Router>
  );
}

export default App;
