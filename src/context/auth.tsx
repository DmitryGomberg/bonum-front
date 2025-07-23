import React, { createContext, ReactNode, useContext, useState } from 'react';

interface AuthContextType {
   isAuthenticated: boolean;
   accessToken: string | null;
   userId: string | null; // Добавляем userId
   login: (token: string, userId: string) => void; // Обновляем сигнатуру
   logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
      const token = document.cookie.split('; ').find((row) => row.startsWith('accessToken='));
      console.log('Initial check: accessToken found in cookies:', !!token);
      return !!token;
   });
   const [accessToken, setAccessToken] = useState<string | null>(() => {
      const token = document.cookie.split('; ').find((row) => row.startsWith('accessToken='));
      const value = token ? token.split('=')[1] : null;
      console.log('Initial accessToken:', value);
      return value;
   });
   const [userId, setUserId] = useState<string | null>(() => {
      const id = document.cookie.split('; ').find((row) => row.startsWith('userId='));
      const value = id ? id.split('=')[1] : null;
      console.log('Initial userId:', value);
      return value;
   });

   const login = (token: string, userId: string) => {
      console.log('Login called with token:', token, 'userId:', userId);
      if (!token || !userId) {
         console.error('Login failed: token or userId is missing');
         return;
      }
      setIsAuthenticated(true);
      setAccessToken(token);
      setUserId(userId);
      document.cookie = `accessToken=${token}; path=/; max-age=3600;`; // 1 час
      document.cookie = `userId=${userId}; path=/; max-age=3600;`;
      console.log('Login successful: isAuthenticated set to true, userId:', userId);
   };

   const logout = () => {
      console.log('Logout called');
      setIsAuthenticated(false);
      setAccessToken(null);
      setUserId(null);
      document.cookie = 'accessToken=; Max-Age=0; path=/;';
      document.cookie = 'userId=; Max-Age=0; path=/;';
      document.cookie = 'refreshToken=; Max-Age=0; path=/;';
      console.log('Logged out: cookies cleared');
   };

   return (
      <AuthContext.Provider value={{ isAuthenticated, accessToken, userId, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
};