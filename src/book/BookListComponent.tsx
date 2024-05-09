import React from 'react';
import BookType from './Book';
import Book from './BookComponent';

interface Props {
  books: BookType[];
}

const BookList: React.FC<Props> = ({ books }) => {
  return (
    <div className="book-list">
      <h1 className="book-text">Book List</h1>
      {books.map((book) => (
        <Book key={book.bookId} book={book} />
      ))}
    </div>
  );
};

export default BookList;
