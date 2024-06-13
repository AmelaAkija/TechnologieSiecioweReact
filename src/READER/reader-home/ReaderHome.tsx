import React, { useEffect, useState } from 'react';
import './ReaderHome.css';
import { useApi } from '../../api/ApiProvider';
import { ClientResponse } from '../../api/library-client';
import BorrowedBook from '../../book/BorrowedBook';
import { useTranslation } from 'react-i18next';
import BorrowedBookComponent from '../../book/BorrowedBookComponent';

const ReaderHome: React.FC = () => {
  const [borrows, setBorrows] = useState<BorrowedBook[]>([]);
  const apiClient = useApi();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { t, i18n } = useTranslation();
  //
  // useEffect(() => {
  //   const fetchData = async (userId: string | null) => {
  //     if (!userId) {
  //       setError('User ID is missing');
  //       setLoading(false);
  //       return;
  //     }
  //
  //     const response: ClientResponse<BorrowedBook[] | null> =
  //       await apiClient.getBorrowedBooks(parseInt(userId, 10));
  //     if (response.success && response.data !== null) {
  //       setBooks(response.data);
  //     } else {
  //       setError('Failed to fetch books');
  //     }
  //     setLoading(false);
  //   };
  //
  //   const fetchUserId = async () => {
  //     const idResponse: ClientResponse<string | null> = await apiClient.getID();
  //     if (idResponse.success && idResponse.data !== null) {
  //       fetchData(idResponse.data);
  //     } else {
  //       setError('Failed to fetch user ID');
  //       setLoading(false);
  //     }
  //   };
  //
  //   fetchUserId();
  // }, []);
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

  return (
    <div>
      <h1 className="home-text">Welcome to Library System!</h1>
      <div className="book-list-container">
        {loading && <div>{t('loading')}</div>}
        {borrows.map((b) => (
          <BorrowedBookComponent borrowedBook={b} />
        ))}
      </div>
    </div>
  );
};

export default ReaderHome;
