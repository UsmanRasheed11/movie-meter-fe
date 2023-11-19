
import { createTheme } from '@mui/system';

const theme = createTheme({
  palette: {
    primary: {
      main: 'linear-gradient(to right, #2b5876, #4e4376)',
    },
    secondary: {
      main: '#FF4081',
    },
    background: {
      paper: '#fff',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  shadows: [
    'none',
    '0px 1px 2px rgba(0, 0, 0, 0.1)',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0px 4px 8px rgba(0, 0, 0, 0.1)',
    '0px 8px 16px rgba(0, 0, 0, 0.1)',
    '0px 16px 24px rgba(0, 0, 0, 0.1)',
    '0px 24px 32px rgba(0, 0, 0, 0.1)',
  ],
});

export default theme;
