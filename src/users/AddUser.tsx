import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './AddUser.css';

const AddUser = ({ role }: { role: string }) => {
  console.log('role:', role);
  const [user, setUser] = useState({
    username: '',
    password: '',
    mail: '',
    fullusername: '',
    role: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/users/Add',
        user,
      );
      console.log('User added successfully:', response.data);
      setSuccessMessage('User added successfully!');
      setUser({
        username: '',
        password: '',
        mail: '',
        fullusername: '',
        role: '',
      });
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(error.response.data);
      } else {
        console.error('Error adding user:', error);
      }
    }
  };

  if (role !== 'ROLE_LIBRARIAN') {
    return (
      <div>
        <h2 className="add-user-text3">Access Denied</h2>
        <p className="add-user-text2">
          You do not have permission to add a user.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="add-user-text">Add User</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="username-input"
          value={user.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="password-input"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mail"
          className="mail-input"
          placeholder="Email"
          value={user.mail}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="fullusername"
          className="fullusername-input"
          placeholder="Full Name"
          value={user.fullusername}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="role"
          className="role-input"
          placeholder="Role"
          value={user.role}
          onChange={handleChange}
          required
        />
        <button className="add-user-button" type="submit">
          Add User
        </button>
      </form>
    </div>
  );
};

export default AddUser;
