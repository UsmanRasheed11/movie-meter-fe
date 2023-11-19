import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Menu,
  MenuItem,
  Modal,
  Box,
  TextField,
  Link,
  Grid
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import theme from '../theme';
import styled from 'styled-components';
import { useAuth } from './auth/AuthContext';

const StyledAppBar = styled(AppBar)`
  background: linear-gradient(to right, #2b5876, #4e4376);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
`;

const StyledToolbar = styled(Toolbar)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${theme.spacing(2)};
`;

const StyledIconButton = styled(IconButton)`
  color: inherit;
`;

const StyledModalContent = styled(Box)`
  background: #fff;
  border: 2px solid #000;
  border-radius: ${theme.shape.borderRadius}px;
  padding: ${theme.spacing(3)};
  width: 80vw;
  max-width: 400px;
  margin: auto;
  text-align: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
`;

const StyledModalButton = styled(Button)`
  background: linear-gradient(to right, #2b5876, #4e4376);
  color: #fff;
  margin-top: ${theme.spacing(2)};

  &:hover {
    background: linear-gradient(to right, #4e4376, #2b5876);
  }
`;

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  const { user, loginModalOpen, login, logout, setLoginModalOpen } = useAuth();

  const handleMenuOpen = (event) => {
    if (user) {
      setAnchorEl(event.currentTarget);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLoginClick = () => {
    setLoginModalOpen(true);
    login(username,password);
    handleMenuClose();
  };

  const handleLogoutClick = () => {
    logout();
    handleMenuClose();
  };

  const handleModalClose = () => {
    setLoginModalOpen(false);
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <StyledAppBar position="static">
        <StyledToolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Movie App
          </Typography>
          <StyledIconButton size="large" onClick={handleMenuOpen}>
            <AccountCircleIcon sx={{ fontSize: { md: '3rem', xs: '2rem' } }} />
          </StyledIconButton>
        </StyledToolbar>
      </StyledAppBar>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem sx={{ px: theme.spacing(2) }} onClick={handleLogoutClick}>
          Logout
        </MenuItem>
        {/* Add more menu items as needed */}
      </Menu>

      {/* Login Modal */}
      <Modal open={loginModalOpen} onClose={handleModalClose} className="modal" sx={{top: '20%'}}>
        <StyledModalContent sx={{borderRadius: '1rem', backgroundColor: theme.palette.primary.main }}>
        <Grid container>
          <Typography variant="h6" gutterBottom>
            Login
          </Typography>
          <TextField value={username} onChange={(e) => setUsername(e.target.value)} label="Username" variant="outlined" fullWidth margin="normal" />
          <TextField value={password} onChange={(e) => setPassword(e.target.value)} label="Password" variant="outlined" fullWidth margin="normal" type="password" />
          <StyledModalButton variant="contained" fullWidth onClick={handleLoginClick}>
            Login
          </StyledModalButton>
          <Typography variant="body2" sx={{ marginTop: theme.spacing(2) }}>
            Don't have an account? <Link href="#">Sign Up</Link>
          </Typography>
          </Grid>
        </StyledModalContent>
      </Modal>
    </div>
  );
};

export default Navbar;
