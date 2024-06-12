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
  // const [role, setRole] = useState<string>('');
  const client = useApi();

  // useEffect(() => {
  //   getRole();
  // }, []);

  // const getRole = async () => {
  //   try {
  //     const response = await client.getRole();
  //     if (response.success) {
  //       if (typeof response.data === 'string') {
  //         setRole(response.data);
  //         console.log('role:', response.data);
  //       } else {
  //         console.error('Role is not a string');
  //       }
  //     } else {
  //       console.error('Failed to fetch role');
  //     }
  //   } catch (error) {
  //     console.error('Error fetching role:', error);
  //   }
  // };
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

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <strong>{t('Library System')}</strong>
          </Typography>
          {showTabs && (
            <Tabs value={location.pathname}>
              <Tab
                label={t('catalog')}
                value="/book-list"
                onClick={() => navigate('/book-list')}
                sx={{
                  color: '#FBFFEA',
                  ...(location.pathname === '/book-list' && activeTabColor),
                }}
              />
              {role === 'ROLE_LIBRARIAN' && (
                <>
                  <Tab
                    label={t('loans')}
                    value="/loan-list"
                    onClick={() => navigate('/loan-list')}
                    sx={{
                      color: '#FBFFEA',
                      ...(location.pathname === '/loan-list' && activeTabColor),
                    }}
                  />
                  <Tab
                    label={t('users')}
                    value="/user-list"
                    onClick={() => navigate('/user-list')}
                    sx={{
                      color: '#FBFFEA',
                      ...(location.pathname === '/user-list' && activeTabColor),
                    }}
                  />
                </>
              )}
              <Tab
                label={t('home')}
                value={role === 'ROLE_LIBRARIAN' ? '/home' : '/home-reader'}
                onClick={() =>
                  navigate(role === 'ROLE_LIBRARIAN' ? '/home' : '/home-reader')
                }
                sx={{
                  color: '#FBFFEA',
                  ...(location.pathname === '/home' && activeTabColor),
                  ...(location.pathname === '/home-reader' && activeTabColor),
                }}
              />
            </Tabs>
          )}
          <Button color="inherit" onClick={toggleLanguage}>
            {language === 'pl' ? 'EN' : 'PL'}
          </Button>
          {showLogoutButton && (
            <Button color="inherit" onClick={handleLogout}>
              {t('LogOut')}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
