import React from 'react';
import LoanType from './Loan';
import Loan from './LoanComponent';

interface Props {
  loans: LoanType[];
}

const LoanList: React.FC<Props> = ({ loans }) => {
  return (
    <div className="loan-list">
      <h1 className="loan-text">Loan List</h1>
      {loans.map((loan) => (
        <Loan key={loan.id} loan={loan} />
      ))}
      <button className="remove-button"> Add loan</button>
    </div>
  );
};

export default LoanList;
