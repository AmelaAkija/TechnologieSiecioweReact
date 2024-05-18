import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  createTheme,
  Tab,
  Tabs,
} from '@mui/material';

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

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const excludeLogin = location.pathname !== '/login';

  return (
    <ThemeProvider theme={theme}>
      {excludeLogin && (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <strong>Library System</strong>
            </Typography>
            <Tabs value={location.pathname}>
              <Tab
                style={{ color: '#FBFFEA' }}
                label="Catalog"
                value="/book-list"
                onClick={() => navigate('/book-list')}
              />
              <Tab
                style={{ color: '#FBFFEA' }}
                label="Loans"
                value="/loan-list"
                onClick={() => navigate('/loan-list')}
              />
              <Tab
                style={{ color: '#FBFFEA' }}
                label="Home"
                value="/home"
                onClick={() => navigate('/home')}
              />
            </Tabs>
          </Toolbar>
        </AppBar>
      )}
    </ThemeProvider>
  );
};

export default Navbar;
