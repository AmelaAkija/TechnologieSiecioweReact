import { Button, TextField } from '@mui/material';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';
import star from '../star.svg';
import { Formik, FormikHelpers } from 'formik';
import React, { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useApi } from '../api/ApiProvider';

function LoginForm() {
  const navigate = useNavigate();
  const apiClient = useApi();
  const [errorMessage, setErrorMessage] = useState('');
  const { t } = useTranslation();
  const onSubmit = useCallback(
    (values: { login: string; password: string }, formik: any) => {
      apiClient.login(values).then((response) => {
        console.log('response', response.data?.token);
        if (response.statusCode === 200) {
          navigate('/home');
        } else {
          formik.setFieldError('username', 'Invalid Username or password');
        }
      });
    },
    [apiClient, navigate],
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
