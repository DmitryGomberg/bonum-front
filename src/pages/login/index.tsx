import {FC, useState} from 'react';
import { UiTitle } from '../../ui/titles/title';
import { UiInput } from '../../ui/input';
import { UiButton } from '../../ui/button';
import { useNavigate } from 'react-router-dom';
import {useNotifications} from "../../context/notifications.tsx";
import {useAuth} from "../../context/auth.tsx";
import {UiInputPassword} from "../../ui/inputPassword";
import ParticlesBg from "particles-bg";

export const LoginPage: FC = () => {
   const navigate = useNavigate();
   const {login} = useAuth();
   const {showNotification} = useNotifications();
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [error, setError] = useState('')

   const handleLogin = async () => {
      if (!validateFields()) return
      try {
         const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
         });
         if (response.ok) {
            showNotification('Успешный вход', 'success');
            login();
            navigate('/home');
         } else {
            showNotification('Неверные email или пароль', 'error');
            console.error('Login failed');
         }
      } catch (error) {
         console.error('Error:', error);
      }
   };

   function validateFields () {
      if(email === '' || password == ''){ setError('Заполните обязательные поля')} else (setError(''))
      return !(email == '' || password == '');
   }

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
         <div className={"mx-auto flex flex-col items-center z-3"}>
            <h1
               className={"text-4xl font-extrabold tracking-tight text-black lg:text-5xl text-foreground mb-2 text-center flex items-end gap-[10px]"}>
               Bonum
            </h1>
            <p className={"text-lg text-muted-foreground text-black mb-[32px] text-center"}>Финансовый учет для вашего бизнеса</p>
         </div>
         <div className="flex flex-col gap-[10px] bg-white p-6 max-w-[440px] w-full border border-brown3 shadow-sm rounded-lg z-3">
            <div className={"flex flex-col items-start pb-[24px]"}>
               <UiTitle className="text-black">Вход в систему</UiTitle>
               <p className="text-black text-[14px]">Введите свои учетные данные для доступа к системе</p>
            </div>
            <div className="flex flex-col gap-[16px]">
               <UiInput label="Email" type={'email'} placeholder="Введите значение" required value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
               <UiInputPassword label="Пароль" placeholder="Введите значение" required value={password}
                        onChange={(e) => setPassword(e.target.value)} />
               <div className={'text-center text-[12px] underline text-brown5 cursor-pointer inline-flex mx-auto'} onClick={()=> navigate('/forgot-password')}>Забыли пароль?</div>
               {error && <div className={"text-red text-center"}>{error}</div>}
               <UiButton label="Войти" onClick={handleLogin}/>
               <p className="text-black text-[14px] text-center font-normal">Нет аккаунта? <span
                  className="underline underline-offset-4 cursor-pointer text-brown4 font-medium"
                  onClick={() => navigate('/registration')}>Зарегистрироваться</span></p>
            </div>
         </div>
      </div>
   );
};