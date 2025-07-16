import {FC, useEffect, useState} from 'react';
import {UiInput} from "../../../ui/input";
import {UiButton} from "../../../ui/button";
import {useUserId} from "../../../utils/auth.tsx";
import {useNotifications} from "../../../context/notifications.tsx";
import {useUser} from "../../../context/user.tsx";

export const SettingsUser: FC = () => {
   const [name, setName] = useState<string>('');
   const [surname, setSurname] = useState<string>('');
   const [username, setUsername] = useState<string>('');
   const [loading, setLoading] = useState<boolean>(false);
   const userId = useUserId();
   const { setUser } = useUser();
   const {showNotification} = useNotifications();

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            setLoading(true);
            const response = await fetch(`http://localhost:8080/api/user/${userId}`);
            if (!response.ok) {
               throw new Error('Failed to fetch user data');
            }
            const user = await response.json();
            setName(user.name || '');
            setSurname(user.surname || '');
            setUsername(user.username || '');
         } catch (err) {
            showNotification((err as Error).message, 'error');
         } finally {
            setLoading(false);
         }
      };

      fetchUserData();
   }, [userId]);

   const handleSave = async () => {
      if (!name.trim() || !surname.trim() || !username.trim()) {
         showNotification('Пожалуйста, заполните все поля', 'error');
         return;
      }

      try {
         setLoading(true);
         const response = await fetch(`http://localhost:8080/api/userInitials`, {
            method: 'PUT',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: userId, name, surname, username }),
         });
         if (!response.ok) {
            throw new Error('Failed to update user data');
         }
         const updatedUser = await response.json();
         setUser(updatedUser);
         showNotification('Настройки успешно сохранены', 'success');
      } catch (err) {
         showNotification((err as Error).message, 'error');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className={'flex flex-col gap-3'}>
         <h2 className={'font-medium text-[18px] text-center text-black'}>
            Данные пользователя
         </h2>
         <div className={'bg-white p-5 flex flex-col gap-[20px] max-w-[600px] mx-auto w-full border border-brown3 rounded-xl'}>
            <UiInput value={name} placeholder={'Введите значение'} label={'Ваше имя'} onChange={(e) => setName(e.target.value)} />
            <UiInput value={surname} placeholder={'Введите значение'} label={'Ваша фамилия'} onChange={(e) => setSurname(e.target.value)} />
            <UiInput value={username} placeholder={'Введите значение'} label={'Имя пользователя'} onChange={(e) => setUsername(e.target.value)} />
            <UiButton label={loading ? 'Сохранение...' : 'Сохранить'} onClick={handleSave} disabled={loading} />
         </div>
      </div>
   );
};