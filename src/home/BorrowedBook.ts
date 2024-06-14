interface BorrowedBook {
  loanId: number;
  title: string;
  loanDateStart: string;
  loanDateEnd: string;
  loanPeriod: number;
}

export default BorrowedBook;
