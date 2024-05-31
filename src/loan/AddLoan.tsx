import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './AddLoan.css';

const AddLoan = ({ role }: { role: string }) => {
  console.log('role:', role);
  const [loan, setLoan] = useState({
    loanDateStart: '',
    loanPeriod: '',
    loanDateEnd: '',
    userLoan: {
      userId: '',
    },
    bookLoan: {
      bookId: '',
    },
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [consoleLogValue, setConsoleLogValue] = useState('');

  const updateNestedState = (
    prevState: any,
    name: string,
    value: string | number,
  ) => {
    const names = name.split('.');
    const newState = { ...prevState };
    let current = newState;
    for (let i = 0; i < names.length; i++) {
      if (i === names.length - 1) {
        current[names[i]] = value;
      } else {
        current = current[names[i]] = { ...current[names[i]] };
      }
    }
    return newState;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoan((prevLoan) => updateNestedState(prevLoan, name, value));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/Loan/Add', loan);
      console.log('Loan added successfully:', response.data);
      setSuccessMessage('Loan added successfully!');
      setLoan({
        loanDateStart: '',
        loanPeriod: '',
        loanDateEnd: 'null',
        userLoan: {
          userId: '',
        },
        bookLoan: {
          bookId: '',
        },
      });
      setErrorMessage('');
      setConsoleLogValue(''); // Clear the console log value
    } catch (error: any) {
      console.error('Error adding loan:', error);
      if (error.response && error.response.data) {
        console.log('Error response:', error.response.data);
        setConsoleLogValue(JSON.stringify(error.response.data));
        if (error.response.status === 404) {
          setErrorMessage(error.response.data.message);
        }
      }
    }
  };

  if (role !== 'ROLE_LIBRARIAN') {
    return (
      <div>
        <h2 className="add-loan-text3">Access Denied</h2>
        <p className="add-loan-text2">
          You do not have permission to add a loan.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="add-loan-text">Add Loan</h2>
      {successMessage && (
        <p className="success-message-loan">{successMessage}</p>
      )}
      {errorMessage && <p className="error-message-loan">{errorMessage}</p>}
      {consoleLogValue && (
        <p className="error-message-loan">
          {consoleLogValue.replace(/['"]+/g, '')}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="date"
          name="loanDateStart"
          placeholder="Loan Date Start"
          className="loanDateStart-input"
          value={loan.loanDateStart}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="loanPeriod"
          className="loanPeriod-input"
          placeholder="Loan Period"
          value={loan.loanPeriod}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="userLoan.userId"
          className="userId-input"
          placeholder="User ID"
          value={loan.userLoan.userId}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="bookLoan.bookId"
          className="bookId-input"
          placeholder="Book ID"
          value={loan.bookLoan.bookId}
          onChange={handleChange}
          required
        />
        <button className="add-loan-button" type="submit">
          Add Loan
        </button>
      </form>
    </div>
  );
};

export default AddLoan;
