// loanService.ts

import LoanType from './Loan'; // Assuming LoanType is defined in a separate file called types.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/Loan'; // Assuming the endpoint for loans is http://localhost:8080/Loan

export const fetchLoans = async (): Promise<LoanType[]> => {
  try {
    const response = await axios.get(`${API_URL}/GetAll`);
    console.log('Response data:', response.data); // Add logging
    return response.data;
  } catch (error) {
    console.error('Error fetching loans:', error);
    throw new Error('Failed to fetch loans');
  }
};
