import { Button, TextField } from '@mui/material';
import './LoginForm.css';
import { Link, useNavigate } from 'react-router-dom';
import star from '../star.svg';
import { Formik, FormikHelpers } from 'formik';
import React, { useCallback, useMemo } from 'react';
import * as yup from 'yup';

function LoginForm() {
  const navigate = useNavigate();

  const onSubmit = useCallback(
    (
      values: { username: string; password: string },
      formikHelpers: FormikHelpers<{ username: string; password: string }>,
    ) => {
      console.log(values);
      navigate('/home');
    },
    [navigate],
  );
  const validationSchema = useMemo(
    () =>
      yup.object().shape({
        username: yup.string().required('Required'),
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
        initialValues={{ username: '', password: '' }}
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
              id="username"
              label="Username"
              variant="standard"
              name="username"
              className="Login-form-input"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.username && !!formik.errors.username}
              helperText={formik.touched.username && formik.errors.username}
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
            {/* Remove Link component */}
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
            <img
              src={star}
              alt="Star"
              style={{
                width: '60vw',
                height: '60vw',
                position: 'absolute',
                right: 0,
                top: '35%',
                transform: 'translateY(-50%) rotate(180deg)',
              }}
            />
          </form>
        )}
      </Formik>
    </div>
  );
}

export default LoginForm;
