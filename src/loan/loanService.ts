import LoanType from './Loan';
import axios from 'axios';

const API_URL = 'http://localhost:8080/Loan';

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
