import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookListComponent from './book/BookListComponent';
import mockBooks from './book/mockData';
import React from 'react';
import LoginForm from './login-form/LoginForm';
import Navbar from './components/Navbar';
import LoanListComponent from './loan/LoanListComponent';
import mockDataLoan from './loan/mockDataLoan';
import Home from './home/Home';
import mockLoans from './loan/mockDataLoan';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/loan-list"
          element={<LoanListComponent loans={mockLoans} />}
        />
        <Route
          path="/book-list"
          element={
            <BookListComponent
              books={mockBooks}
              title={'Book list'}
              showReserveButton={true}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
