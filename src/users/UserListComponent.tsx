import React, { useEffect, useState } from 'react';
import UserComponent from './UserComponent';
import { LibraryClient, ClientResponse } from '../api/library-client';
import UserType from './User';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import toast from 'react-hot-toast';

interface Props {
  title: string;
}

const UserListComponent: React.FC<Props> = ({ title }) => {
  const [users, setUsers] = useState<UserType[]>([]);
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const apiClient = useApi();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response: ClientResponse<any> = await apiClient.getUsers();
      if (response.success) {
        setUsers(response.data);
        setLoading(false);
      } else {
        if (
          response.statusCode === 403 &&
          !localStorage.getItem('permissionErrorShown')
        ) {
          toast.error(t('noPermissionError'));
          localStorage.setItem('permissionErrorShown', 'true');
        } else {
          // toast.error(t('noPermissionError'));
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [apiClient, t]);

  const handleDelete = async (userId: number, reloadPage: () => void) => {
    try {
      const response = await apiClient.deleteUser(userId);
      if (response.success) {
        setUsers(users.filter((user) => user.userId !== userId));
        toast.success(t('userDeletedSuccessfully'));
      } else {
        toast.error(t('failedToDelete'));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error(t('failedToDelete'));
    }
  };

  return (
    <div className="user-list">
      <h1 className="user-text">{t('users')}</h1>
      {error && <p className="error">{error}</p>}
      {users.map((user) => (
        <div key={user.userId} className="user-container">
          <UserComponent user={user} onDelete={handleDelete} />
          <div className="details-user">{t('detailsLoans')}</div>
        </div>
      ))}
    </div>
  );
};

export default UserListComponent;
