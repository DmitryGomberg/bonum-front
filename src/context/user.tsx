import {createContext, useContext, useState, useEffect, FC, ReactNode} from 'react';
import {useUserId} from "../utils/auth.tsx";

interface User {
   name: string;
   surname: string;
   username: string;
}

interface UserContextProps {
   user: User;
   setUser: (user: User) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
   const [user, setUser] = useState<User>({
      name: '',
      surname: '',
      username: '',
   });
   const userID = useUserId();

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const response = await fetch(`https://bonum-back-production.up.railway.app/api/user/${userID}`);
            if (!response.ok) {
               throw new Error('Failed to fetch user data');
            }
            const userData = await response.json();
            setUser(userData);
         } catch (error) {
            console.error('Error fetching user data:', error);
         }
      };

      fetchUserData();
   }, [userID]);

   return (
      <UserContext.Provider value={{ user, setUser }}>
         {children}
      </UserContext.Provider>
   );
};

export const useUser = (): UserContextProps => {
   const context = useContext(UserContext);
   if (!context) {
      throw new Error('useUser must be used within a UserProvider');
   }
   return context;

};