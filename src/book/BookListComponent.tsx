import React from 'react';
import BookType from './Book';
import Book from './BookComponent';

interface Props {
  books: BookType[];
  title?: string;
}

const BookListComponent: React.FC<Props> = ({ books, title }) => {
  return (
    <div>
      {title && <h2 className="title-text">{title}</h2>}
      <div className="book-list">
        {books.map((book) => (
          <Book key={book.bookId} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookListComponent;
