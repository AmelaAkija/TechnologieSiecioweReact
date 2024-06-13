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
import UserListComponent from './users/UserListComponent';
import UpdateBook from './book/UpdateBook';
import UpdateUser from './users/UpdateUser';
import UpdateLoan from './loan/UpdateLoan';
function App() {
  return (
    <Router>
      <ApiProvider>
        <I18nextProvider i18n={i18n}>
          <Navbar />
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home-reader" element={<ReaderHome />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/update-user" element={<UpdateUser />} />
            <Route path="/update-loan" element={<UpdateLoan />} />
            <Route path="/update-book" element={<UpdateBook />} />
            <Route path="/add-loan" element={<AddLoan />} />
            <Route
              path="/loan-list"
              element={<LoanListComponent title={'Loans'} />}
            />
            <Route
              path="/user-list"
              element={<UserListComponent title={'users'} />}
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
