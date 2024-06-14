import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import User from './User';
import './AddUser.css';
import toast from 'react-hot-toast';

const UpdateUser = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { t } = useTranslation();
  const clientApi = useApi();
  const [roleFromLocalStorage, setRole] = useState<string | null>(null);
  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    const roleFromLocalStorage = localStorage.getItem('role');
    setRole(roleFromLocalStorage);

    if (roleFromLocalStorage === 'ROLE_READER') {
      console.log('no permission');
    }
  }, []);
  if (roleFromLocalStorage === 'ROLE_READER') {
    toast.error(t('noPermissionError'));
    return null;
  }

  const fetchUsers = async () => {
    try {
      const response = await clientApi.getUsers();
      setUserList(response.data);
    } catch (error) {
      console.error('Error fetching user list:', error);
    }
  };

  const fetchUserDetails = async (userId: number) => {
    try {
      const response = await clientApi.getUserById(userId);
      if (response.success) {
        setUserDetails(response.data);
      } else {
        console.error('Failed to fetch user details:', response);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const handleUserSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const userId = parseInt(e.target.value, 10);
    setSelectedUserId(userId);
    fetchUserDetails(userId);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (userDetails) {
      setUserDetails({
        ...userDetails,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userDetails && selectedUserId !== null) {
      try {
        const response = await clientApi.updateUser(
          selectedUserId,
          userDetails,
        );
        if (response.success) {
          toast.success(t('updated'));
          setErrorMessage('');
        } else {
          toast.error(t('errorUpdate'));
        }
      } catch (error: any) {
        console.error('Error updating user:', error);
        toast.error(t('errorUpdate'));
      }
    }
  };

  return (
    <div>
      <h2 className="add-user-text">{t('updateUser')}</h2>
      {successMessage && (
        <p className="success-message-user">{successMessage}</p>
      )}
      {errorMessage && <p className="error-message-user">{errorMessage}</p>}

      <select
        className="choose-user"
        onChange={handleUserSelect}
        value={selectedUserId || ''}
      >
        <option value="" disabled>
          {t('selectUser')}
        </option>
        {userList.map((user) => (
          <option key={user.userId} value={user.userId}>
            {user.fullusername} ({user.userId})
          </option>
        ))}
      </select>

      {userDetails && (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            placeholder={t('username')}
            className="username-input-update"
            value={userDetails?.username || ''}
            onChange={handleChange}
          />

          <input
            type="email"
            name="mail"
            placeholder="email"
            className="mail-input-update"
            value={userDetails?.mail || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="fullusername"
            placeholder={t('fullusername')}
            className="fullusername-input-update"
            value={userDetails?.fullusername || ''}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            className="password-input-update"
            placeholder={t('password')}
            value={userDetails.password}
            onChange={handleChange}
            required
          />
          <button className="add-user-button" type="submit">
            {t('updateUser')}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateUser;
