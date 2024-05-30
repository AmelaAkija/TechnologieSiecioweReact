import { Button, TextField } from '@mui/material';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import star from '../star.svg';
import { Formik, FormikHelpers } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import jwt_decode, { jwtDecode } from 'jwt-decode';
interface LoginFormValues {
  login: string;
  password: string;
}
interface LoginFormProps {
  setRole: (role: string) => void;
}
interface MyToken {
  id: string;
  role: string;
}

function LoginForm(props: LoginFormProps) {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = useCallback(
    async (
      values: LoginFormValues,
      formikHelpers: FormikHelpers<LoginFormValues>,
    ) => {
      console.log(values);
      const client = axios.create({ baseURL: 'http://localhost:8080' });
      try {
        const response = await client.post('/Login', values);
        console.log(response);

        if (response.status === 200) {
          const token = response.data;
          localStorage.setItem('authToken', token);
          const decodedToken = jwtDecode<MyToken>(token);
          const role = decodedToken.role;
          props.setRole(role);
          console.log(role);
          navigate('/home');
        }
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 401) {
            setErrorMessage('Wrong username or password');
          } else {
            setErrorMessage('An error occurred. Please try again later.');
          }
        } else {
          setErrorMessage('An unknown error occurred.');
        }
      }
      console.log('request sent');
    },
    [navigate],
  );

  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        login: yup.string().required('Required'),
        password: yup
          .string()
          .required('Required')
          .min(5, 'Password too short'),
      }),
    [],
  );

  return (
    <div className="Login-form">
      <Formik
        initialValues={{ login: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        validateOnChange
        validateOnBlur
      >
        {(formik) => (
          <form
            className="Login-form"
            id="signForm"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <h1 className="Login-form-text">Log in to the library system!</h1>
            <TextField
              style={{ marginBottom: '1vh' }}
              id="login"
              label="Username"
              variant="standard"
              name="login"
              className="Login-form-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.login && !!formik.errors.login}
              helperText={formik.touched.login && formik.errors.login}
            />
            <TextField
              id="password"
              label="Password"
              variant="standard"
              type="password"
              name="password"
              className="Login-form-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && !!formik.errors.password}
              helperText={formik.touched.password && formik.errors.password}
            />
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <Button
              variant="contained"
              type="submit"
              form="signForm"
              disabled={!(formik.isValid && formik.dirty)}
              className="Login-button"
              style={{ backgroundColor: '#fbffea', color: '#3A3A72' }}
            >
              Sign in
            </Button>
            <img src={star} alt="Star" className="star" />
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
