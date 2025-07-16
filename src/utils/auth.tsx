import {jwtDecode} from 'jwt-decode';
import { useAuth } from '../context/auth';

export const useUserId = (): number | null => {
   const { accessToken } = useAuth();

   if (!accessToken) {
      return null;
   }

   try {
      const decoded: { id?: number } = jwtDecode(accessToken);

      if (!decoded.id) {
         console.error('Decoded token does not contain user_id.');
         return null;
      }

      return decoded.id;
   } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
   }
};