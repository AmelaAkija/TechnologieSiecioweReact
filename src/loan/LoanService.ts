import api from '../api';
import LoanType from './Loan';

export const fetchLoans = async (): Promise<LoanType[]> => {
  try {
    const response = await api.get<LoanType[]>('/Loan/GetAll');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch loans');
  }
};
