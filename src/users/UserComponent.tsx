import React, { useState } from 'react';
import './User.css';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import User from './User';
import { useApi } from '../api/ApiProvider';

interface Props {
  user: User;
  onDelete: (userId: number, callback: () => void) => void;
}

const UserComponent: React.FC<Props> = ({ user, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const client = useApi();
  const [error, setError] = useState<string | null>(null);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  const confirmationMessage = t('confirm-user');
  const manageUser = async () => {
    const confirmed = window.confirm(confirmationMessage);
    if (!confirmed) return;

    setLoading(true);
    setError(null);
    try {
      console.log('Deleting user with ID:', user.userId);
      const response = await client.deleteUser(user.userId);
      if (response.success) {
        console.log('User deleted successfully');
        window.location.reload();
      } else {
        setError(t('failedToDeleteUser'));
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      setError(t('failedToDeleteUser'));
    }
    setLoading(false);
  };

  return (
    <div className="user-container">
      <h2
        className="medium-user-text"
        onClick={toggleDetails}
        style={{ cursor: 'pointer' }}
      >
        ID: {user.userId}
      </h2>
      {showDetails && (
        <div className="details-container-user">
          <p>
            <strong>{t('username')}:</strong> <br />
            {user.username}
          </p>
          <p>
            <strong>{t('email')}:</strong> <br />
            {user.mail}
          </p>
          <p>
            <strong>{t('fullusername')}:</strong> <br />
            {user.fullusername}
          </p>
          {error && <p className="error">{t('failedToDeleteUser')}</p>}{' '}
          <button
            className="remove-button-user"
            onClick={manageUser}
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : t('remove')}
          </button>
        </div>
      )}
    </div>
  );
};

export default UserComponent;
