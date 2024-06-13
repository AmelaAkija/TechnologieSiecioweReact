import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import User from './User';
import './AddUser.css';

const UpdateUser = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { t } = useTranslation();
  const clientApi = useApi();

  useEffect(() => {
    fetchUsers();
  }, []);

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
          setSuccessMessage('User updated successfully!');
          setErrorMessage('');
        } else {
          setErrorMessage('Failed to update user');
        }
      } catch (error: any) {
        console.error('Error updating user:', error);
        setErrorMessage('Failed to update user');
      }
    }
  };

  return (
    <div>
      <h2 className="add-user-text">{t('UpdateUser')}</h2>
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
          {t('SelectUser')}
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
            placeholder={t('Username')}
            className="username-input"
            value={userDetails?.username || ''}
            onChange={handleChange}
          />

          <input
            type="email"
            name="mail"
            placeholder={t('Mail')}
            className="mail-input"
            value={userDetails?.mail || ''}
            onChange={handleChange}
          />
          <input
            type="text"
            name="fullusername"
            placeholder={t('FullName')}
            className="fullusername-input"
            value={userDetails?.fullusername || ''}
            onChange={handleChange}
          />
          <button className="update-user-button" type="submit">
            {t('UpdateUser')}
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateUser;
