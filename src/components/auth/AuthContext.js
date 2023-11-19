
import { createContext, useContext, useState } from 'react';
import api from '../../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const login = async (username, password) => {
    try {
      const response = await api.post('/auth/login', { username, password });
      setUser(response.data);
      localStorage.setItem('accessToken',response.data.access_token)
      setLoginModalOpen(false);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('accessToken');
  };

  return (
    <AuthContext.Provider value={{ user, loginModalOpen, setLoginModalOpen, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
