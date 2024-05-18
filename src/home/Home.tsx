import React from 'react';
import './Home.css';
import BookList from '../book/BookListComponent';
import Book from '../book/Book';

const Home: React.FC = () => {
  const borrowedBooks: Book[] = [
    {
      bookId: 1,
      isbn: '978-0451524935',
      title: '1984',
      author: 'George Orwell',
      publisher: 'Signet Classic',
      publishYear: 1961,
      availableCopies: 4,
    },
    {
      bookId: 2,
      isbn: '978-0061120084',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      publisher: 'Harper Perennial Modern Classics',
      publishYear: 2006,
      availableCopies: 2,
    },
    {
      bookId: 3,
      isbn: '978-0743273565',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      publisher: 'Scribner',
      publishYear: 2004,
      availableCopies: 3,
    },
  ];

  return (
    <div>
      <h1 className="home-text">Welcome to Library System</h1>
      <div className="book-list-container">
        <h2 className="title-text"> Borrowed books:</h2>
        <BookList books={borrowedBooks} />
      </div>
    </div>
  );
};

export default Home;
