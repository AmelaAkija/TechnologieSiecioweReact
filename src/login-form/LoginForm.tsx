import { Button, TextField } from '@mui/material';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import star from '../star.svg';
import { Formik, FormikHelpers } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';
import toast, { Toaster } from 'react-hot-toast';
import axios, { AxiosError } from 'axios';

// Type guard to check if the error is an AxiosError
function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).isAxiosError !== undefined;
}

function LoginForm() {
  const navigate = useNavigate();
  const apiClient = useApi();
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();
  const message = t('wrongCredentials');
  const passwordMessage = t('shortPassword');
  const required = t('required');
  const otherError = t('unknown');
  const onSubmit = useCallback(
    async (values: { login: string; password: string }, formik: any) => {
      try {
        const response = await apiClient.login(values);
        if (response.statusCode === 200) {
          const roleResponse = await apiClient.getRole();
          if (roleResponse.success) {
            localStorage.setItem('role', roleResponse.data || '');
            if (roleResponse.data === 'ROLE_LIBRARIAN') {
              navigate('/home');
            } else {
              navigate('/home-reader');
            }
            setTimeout(() => {
              window.location.reload();
            }, 10);
          } else {
            console.error('Failed to get user role:', roleResponse.statusCode);
          }
        } else if (response.statusCode === 401) {
          formik.setFieldError('username', t('wrongCredentials'));
          toast.error(t('wrongCredentials'));
        } else {
          toast.error(t('unknown'));
        }
      } catch (error: unknown) {
        if (isAxiosError(error)) {
          // Axios-specific error handling
          if (error.response) {
            toast.error(t('unknown'));
          } else if (error.request) {
            toast.error(t('unknown'));
          } else {
            toast.error(t('unknown'));
          }
          console.error('Axios Error:', error.message);
        } else if (error instanceof Error) {
          // General error handling
          toast.error(t('unknownError'));
          console.error('Error:', error.message);
        } else {
          toast.error(t('unknownError'));
          console.error('Unexpected Error:', error);
        }
        setErrorMessage(t('networkError'));
      }
    },
    [apiClient, navigate, t],
  );
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        login: yup.string().required(required),
        password: yup.string().required(required).min(5, passwordMessage),
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
            <h1 className="Login-form-text">{t('LoginMessage')}</h1>
            <TextField
              style={{ marginBottom: '1vh' }}
              id="login"
              label={t('username')}
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
              label={t('password')}
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
              <div className="error-message-login">{t('errorLogin')}</div>
            )}
            <Button
              variant="contained"
              type="submit"
              form="signForm"
              disabled={!(formik.isValid && formik.dirty)}
              className="Login-button"
              style={{ backgroundColor: '#fbffea', color: '#3A3A72' }}
            >
              {t('SignIn')}
            </Button>
            <img src={star} alt="Star" className="star" />
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
