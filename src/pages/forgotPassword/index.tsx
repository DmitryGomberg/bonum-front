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
            bg={{
               position: 'absolute',
               top: 0,
               left: 0,
               width: '100%',
               height: '100%',
               zIndex: 0, // Фон позади всех элементов
            }}
            num={60} // Количество частиц
            color="#ffd0a1" // Белые звёздочки для контраста
            config={{
               rps: 0.01, // Скорость вращения
               radius: [1,2], // Размер частиц
               life: [1.5, 3], // Время жизни частиц
               v: [0.1, 0.5], // Скорость движения
               tha: [-40, 40], // Угол движения
               alpha: [1, 2], // Прозрачность
               scale: [1,100], // Масштаб
               position: 'all', // Частицы по всему экрану
               cross: 'dead', // Поведение при столкновении
               random: 10, // Случайность движения
            }}
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