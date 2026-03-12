import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#34d399',
      light: '#6ee7b7',
      dark: '#059669',
      contrastText: '#ffffff',
    },
    background: {
      default: '#0a0f18',
      paper: 'rgba(15,23,42,0.6)',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
      disabled: '#475569',
    },
    divider: '#334155',
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  shape: {
    borderRadius: 16,
  },
});

export default theme;
