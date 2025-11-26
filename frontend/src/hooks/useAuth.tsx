import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react'; 
import { api } from '../services/api';
import type { LoginCredentials, User, AuthResponse } from '../types/Auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const isAuthenticated = !!user;
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUserRaw = localStorage.getItem('user');

    if (storedToken && storedUserRaw) {
      try {
        const storedUser = JSON.parse(storedUserRaw);
        
        if (storedUser && typeof storedUser === 'object' && storedUser.id) {
            setAccessToken(storedToken);
            setUser(storedUser);
            return;
        }

      } catch (e) {
        console.error("Dados de autenticação corrompidos no localStorage. Limpando.", e);
      }
    }
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setAccessToken(null);
    setUser(null);

  }, []);

  const login = async (credentials: LoginCredentials) => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      const { accessToken: newAccessToken, user: loggedUser } = response.data;

      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('user', JSON.stringify(loggedUser));

      setAccessToken(newAccessToken);
      setUser(loggedUser);
      
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "Falha no login. Verifique as credenciais.";
        throw new Error(errorMessage);
    }
  };
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setAccessToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};