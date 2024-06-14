// ReaderHome.tsx
import React, { useEffect, useState } from 'react';
import BorrowedBookComponent from './BorrowedBookComponent';
import { useApi } from '../api/ApiProvider';
import { useTranslation } from 'react-i18next';
import './ReaderHome.css';
import BorrowedBook from './BorrowedBook';
import { Select, MenuItem } from '@mui/material'; // Import Select and MenuItem from MUI

const ReaderHome: React.FC = () => {
  const [borrows, setBorrows] = useState<BorrowedBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedLoanId, setExpandedLoanId] = useState<number | null>(null); // Changed to number | null
  const [filterType, setFilterType] = useState<string>('all');
  const { t } = useTranslation();
  const apiClient = useApi();

  useEffect(() => {
    const fetchAllBooks = async () => {
      setLoading(true);
      try {
        const response = await apiClient.getUserLoans();
        if (response.success) {
          setBorrows(response.data || []);
          setError('');
        } else {
          setError('Failed to fetch borrows');
        }
      } catch (error) {
        setError('Error fetching borrows');
      } finally {
        setLoading(false);
      }
    };

    fetchAllBooks();
  }, [apiClient]);

  const filteredBorrows = borrows.filter((borrow) => {
    if (filterType === 'null') {
      return borrow.loanDateEnd === null;
    } else if (filterType === 'notNull') {
      return borrow.loanDateEnd !== null;
    } else {
      return true;
    }
  });

  return (
    <div>
      <h1 className="home-text-borrow">{t('homeMessage')}</h1>
      <h1 className="borrows">{t('borrows')}</h1>

      <Select
        value={filterType}
        className="choose-borrow"
        onChange={(e) => setFilterType(e.target.value as string)}
      >
        <MenuItem value="all">{t('all')}</MenuItem>
        <MenuItem value="null">{t('unfinished')}</MenuItem>
        <MenuItem value="notNull">{t('finishedLoans')}</MenuItem>
      </Select>

      <div className="book-list-container">
        {loading && <div>{t('loading')}</div>}
        {filteredBorrows.map((b) => (
          <BorrowedBookComponent borrowedBook={b} key={b.loanId} />
        ))}
      </div>
    </div>
  );
};

export default ReaderHome;
