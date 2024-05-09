import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  ThemeProvider,
  createTheme,
} from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3A3A72',
    },
    background: {
      default: '#FBFFEA ',
    },
  },
});

const Navbar: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <strong>Library System</strong>
          </Typography>
          <Link
            to="/login"
            style={{
              textDecoration: 'none',
              marginRight: '20px',
              color: theme.palette.primary.main,
            }}
          >
            Login
          </Link>
          <Link
            to="/book-list"
            style={{
              color: theme.palette.primary.main,
              textDecoration: 'none',
            }}
          >
            Book List
          </Link>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default Navbar;
