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

// Define the color of the active tab
const activeTabColor = {
  backgroundColor: '#FBFFEA',
  color: '#3a3a72',
  borderRadius: '1vh',
  fontWeight: 'bold',
};

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
                label="Catalog"
                value="/book-list"
                onClick={() => navigate('/book-list')}
                sx={{
                  color: '#FBFFEA',
                  ...(location.pathname === '/book-list' && activeTabColor),
                }}
              />
              <Tab
                label="Loans"
                value="/loan-list"
                onClick={() => navigate('/loan-list')}
                sx={{
                  color: '#FBFFEA',
                  ...(location.pathname === '/loan-list' && activeTabColor),
                }}
              />
              <Tab
                label="Home"
                value="/home"
                onClick={() => navigate('/home')}
                sx={{
                  color: '#FBFFEA',
                  ...(location.pathname === '/home' && activeTabColor),
                }}
              />
            </Tabs>
          </Toolbar>
        </AppBar>
      )}
    </ThemeProvider>
  );
};

export default Navbar;
