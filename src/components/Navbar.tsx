import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  createTheme,
  Tab,
  Tabs,
  Button,
} from '@mui/material';
import { useApi } from '../api/ApiProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3A3A72',
    },
    background: {
      default: '#FBFFEA',
    },
    text: {
      primary: '#3A3A72',
      secondary: '#FFFFFF',
    },
  },
});

const activeTabColor = {
  backgroundColor: '#FBFFEA',
  color: '#3a3a72',
  borderRadius: '1vh',
  fontWeight: 'bold',
};

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [language, setLanguage] = useState('pl');
  const client = useApi();
  const [role, setRole] = useState<string>(() => {
    return localStorage.getItem('role') || '';
  });

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);

  const toggleLanguage = () => {
    const newLanguage = language === 'pl' ? 'en' : 'pl';
    setLanguage(newLanguage);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/');
  };

  const showTabs = location.pathname !== '/';
  const showLogoutButton = location.pathname !== '/';

  const tabs = [
    <Tab
      key="catalog"
      label={t('catalog')}
      value="/book-list"
      onClick={() => navigate('/book-list')}
      sx={{
        color: location.pathname === '/book-list' ? '#3a3a72' : '#FBFFEA',
        '&.Mui-selected': {
          color: '#3a3a72',
        },
        ...(location.pathname === '/book-list' && activeTabColor),
      }}
    />,
    ...(role === 'ROLE_LIBRARIAN'
      ? [
          <Tab
            key="loans"
            label={t('loans')}
            value="/loan-list"
            onClick={() => navigate('/loan-list')}
            sx={{
              color: location.pathname === '/loan-list' ? '#3a3a72' : '#FBFFEA',
              '&.Mui-selected': {
                color: '#3a3a72',
              },
              ...(location.pathname === '/loan-list' && activeTabColor),
            }}
          />,
          <Tab
            key="users"
            label={t('users')}
            value="/user-list"
            onClick={() => navigate('/user-list')}
            sx={{
              color: location.pathname === '/user-list' ? '#3a3a72' : '#FBFFEA',
              '&.Mui-selected': {
                color: '#3a3a72',
              },
              ...(location.pathname === '/user-list' && activeTabColor),
            }}
          />,
        ]
      : []),
    <Tab
      key="home"
      label={t('home')}
      value={role === 'ROLE_LIBRARIAN' ? '/home' : '/home-reader'}
      onClick={() =>
        navigate(role === 'ROLE_LIBRARIAN' ? '/home' : '/home-reader')
      }
      sx={{
        color:
          location.pathname === '/home' || location.pathname === '/home-reader'
            ? '#3a3a72'
            : '#FBFFEA',
        '&.Mui-selected': {
          color: '#3a3a72',
        },
        ...(location.pathname === '/home' && activeTabColor),
        ...(location.pathname === '/home-reader' && activeTabColor),
      }}
    />,
  ];

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <strong>{t('Library System')}</strong>
          </Typography>
          {showTabs && (
            <Tabs
              value={location.pathname}
              textColor="secondary"
              indicatorColor="primary"
            >
              {tabs}
            </Tabs>
          )}
          <Button color="inherit" onClick={toggleLanguage}>
            {language === 'pl' ? 'EN' : 'PL'}
          </Button>
          {showLogoutButton && (
            <Button color="inherit" onClick={handleLogout}>
              {t('logOut')}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
