import React, {createContext, ReactNode, useContext, useState} from "react";

interface AuthContextType {
   isAuthenticated: boolean;
   accessToken: string | null;
   login: () => void;
   logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
      const token = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
      return token !== undefined;
   });
   const [accessToken, setAccessToken] = useState<string | null>(() => {
      const token = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
      return token ? token.split('=')[1] : null;
   });


   const login = () => {
      const token = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
      if (token) {
         const accessToken = token.split('=')[1];
         if (accessToken) {
            setIsAuthenticated(true);
            setAccessToken(accessToken);
         } else {
            console.error('Access token value is empty');
         }
      } else {
         console.error('Access token not found in cookies');
      }
   };


   const logout = () => {
      setIsAuthenticated(false);
      setAccessToken(null);
      document.cookie = 'accessToken=; Max-Age=0; path=/;';
      document.cookie = 'refreshToken=; Max-Age=0; path=/;';
   };

   return (
      <AuthContext.Provider value={{ isAuthenticated, accessToken, login, logout }}>
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