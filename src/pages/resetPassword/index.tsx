import { FC, useState } from 'react';
import { UiInputPassword } from '../../ui/inputPassword';
import { UiButton } from '../../ui/button';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {UiTitle} from "../../ui/titles/title";

export const ResetPasswordPage: FC = () => {
   const [password, setPassword] = useState('');
   const [message, setMessage] = useState('');
   const [searchParams] = useSearchParams();
   const token = searchParams.get('token');
   const navigate = useNavigate();

   const handleReset = async () => {
      try {
         const response = await fetch('http://localhost:8080/api/reset-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password }),
         });
         if (response.ok) {
            setMessage('Пароль успешно изменен.');
            navigate('/login');
         } else {
            setMessage('Ошибка при сбросе пароля.');
         }
      } catch (error) {
         console.error('Error:', error);
         setMessage('Произошла ошибка.');
      }
   };

   return (
      <div
         className="bg-brown2 w-full min-h-screen flex items-center justify-center flex-col px-4 py-8 mx-auto sm:px-6 lg:px-8">
         <div className={'flex flex-col gap-[15px] bg-brown1 p-6 max-w-[440px] w-full border border-brown3 shadow-sm rounded-lg'}>
            <UiTitle>Сброс пароля</UiTitle>
            <UiInputPassword
               label="Новый пароль"
               placeholder="Введите новый пароль"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            <UiButton label="Сбросить пароль" onClick={handleReset}/>
            {message && <p>{message}</p>}
         </div>
      </div>
   );
};