import Book from '../book/Book';

interface Loan {
  id: number;
  loanDateStart: string;
  loanDateEnd: string;
  loanUserId: number;
  loanBookId: number;
}

export default Loan;
