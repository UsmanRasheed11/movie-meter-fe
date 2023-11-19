
import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { styled } from '@mui/system';
import { useAuth } from '../components/auth/AuthContext';
import theme from '../theme';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: theme.spacing(8),
  backgroundColor: theme.palette.background.paper,
  borderRadius: '8px',
  boxShadow: theme.shadows[6],
  padding: theme.spacing(4),
});

const StyledAvatar = styled(Avatar)({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
});

const StyledForm = styled('form')({
  width: '100%', // Fix IE 11 issue.
  marginTop: theme.spacing(1),
});

const StyledSubmitButton = styled(Button)({
  margin: theme.spacing(3, 0, 2),
});

const LoginPage = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    login(username, password);
  };

  return (
    <>
      <CssBaseline />
      <StyledContainer component="main" maxWidth="xs">
        <StyledAvatar>
          <LockOutlinedIcon />
        </StyledAvatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <StyledForm noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledSubmitButton type="button" fullWidth variant="contained" color="primary" onClick={handleLogin}>
            Sign In
          </StyledSubmitButton>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </StyledForm>
      </StyledContainer>
    </>
  );
};

export default LoginPage;
