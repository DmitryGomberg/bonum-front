import { FC, useState } from 'react';
import { UiInput } from '../../ui/input';
import { UiButton } from '../../ui/button';
import {UiTitle} from "../../ui/titles/title";
import ParticlesBg from "particles-bg";

export const ForgotPasswordPage: FC = () => {
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');

   const handleSubmit = async () => {
      try {
         const response = await fetch('http://localhost:8080/api/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
         });
         if (response.ok) {
            setMessage('Проверьте вашу почту для дальнейших инструкций.');
         } else {
            setMessage('Ошибка при отправке email.');
         }
      } catch (error) {
         console.error('Error:', error);
         setMessage('Произошла ошибка.');
      }
   };

   return (
      <div className="bg-brown2 w-full min-h-screen flex items-center justify-center flex-col px-4 py-8 mx-auto sm:px-6 lg:px-8">
         <ParticlesBg
            type="cobweb" // Тип анимации: круги для звёздочек
            num={60} // Количество частиц
            color="#ffd0a1" // Белые звёздочки для контраста
         />
         <div className={'flex flex-col gap-[15px] bg-white p-6 max-w-[440px] w-full border border-brown3 shadow-sm rounded-lg z-3'}>
            <UiTitle>Восстановление пароля</UiTitle>
            <UiInput
               label="Email"
               type="email"
               placeholder="Введите ваш email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <UiButton label="Отправить" onClick={handleSubmit} className={'w-full'} />
            {message && <p>{message}</p>}
         </div>
      </div>
   );
};