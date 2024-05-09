import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookListComponent from './book/BookListComponent';
import mockBooks from './book/mockData';
import React from 'react';
import LoginForm from './login-form/LoginForm';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar should be outside the Routes */}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route
          path="/book-list"
          element={<BookListComponent books={mockBooks} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
