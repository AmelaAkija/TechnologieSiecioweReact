import Book from '../book/Book';

interface Loan {
  id: number;
  loanDateStart: string;
  loanDateEnd: string;
  userLoan: string;
  bookLoan: string;
}

export default Loan;
