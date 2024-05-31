export interface Loan {
  loanId: number;
  loanDateStart: number;
  loanPeriod: number;
  loanDateEnd: number | null;
  userId: number;
  bookId: number;
}
export default Loan;
