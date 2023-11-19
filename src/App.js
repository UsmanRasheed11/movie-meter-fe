
import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider } from './components/auth/AuthContext';
import ErrorPage from './error-page';
import Index from './pages';
import LoginPage from './pages/LoginPage';
import { ThemeProvider } from '@mui/system';
import theme from './theme';
import MoviesPage from './pages/MoviesPage';

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Index />,
    // loader: rootLoader,
    children: [
      {
        path: "/",
        element: <MoviesPage />,
        errorElement: <ErrorPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <AuthProvider theme={theme}>
    <ThemeProvider>
      <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
