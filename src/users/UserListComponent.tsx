import React, { useEffect, useState } from 'react';
import UserComponent from './UserComponent';
import { LibraryClient, ClientResponse } from '../api/library-client';
import UserType from './User';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';

interface Props {
  title: string;
}

const UserListComponent: React.FC<Props> = ({ title }) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const apiClient = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const response: ClientResponse<UserType[]> = await apiClient.getUsers();
      if (response.success) {
        setUsers(response.data);
      } else {
        setError(t('failedToFetchUsers'));
      }
    };

    fetchData();
  }, [t, apiClient]);

  const handleDelete = async (userId: number, reloadPage: () => void) => {
    const response = await apiClient.deleteUser(userId);
    if (response.success) {
      reloadPage();
    } else {
      setError(t('failedToDeleteUser'));
    }
  };

  return (
    <div className="user-list">
      <h1 className="details-user"> {t('detailsLoans')}</h1>
      <h1 className="user-text">{t('users')}</h1>
      {error && <p className="error">{error}</p>}
      {users.map((user) => (
        <UserComponent key={user.userId} user={user} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default UserListComponent;
