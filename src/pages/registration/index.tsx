import { FC, useState } from 'react'
import { UiTitle } from '../../ui/titles/title'
import { UiInput } from '../../ui/input'
import { UiButton } from '../../ui/button'
import { useNavigate } from 'react-router-dom'
import { useNotifications } from '../../context/notifications'
import { useAuth } from '../../context/auth'
import { UiInputPassword } from '../../ui/inputPassword'
import ParticlesBg from 'particles-bg';

export const RegisterPage: FC = () => {
   const [email, setEmail] = useState('')
   const [name, setName] = useState('')
   const [surname, setSurname] = useState('')
   const [error, setError] = useState('')
   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')

   const navigate = useNavigate()
   const {showNotification} = useNotifications()
   const { login } = useAuth();


   const handleRegister = async () => {
      if (!validateFields()){
         return
      }

      try {
         const response = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password, name, surname }),
         })
         if (response.ok) {
            login();
            showNotification('Пользователь успешно зарегистрирован', 'success');
            navigate('/login')
         } else {
            showNotification('Ошибка регистрации', 'error');
            console.error('Registration failed')
         }
      } catch (error) {
         console.error('Error:', error)
      }
   }

   function validateFields() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email === '' || password === '' || confirmPassword === '' || name === '' || surname === '') {
         setError('Заполните обязательные поля');
         return false;
      } else if (!emailRegex.test(email)) {
         setError('Введите корректный email');
         return false;
      } else if (password.length <= 6) {
         setError('Пароль должен быть длиннее 6 символов');
         return false;
      } else if (password !== confirmPassword) {
         setError('Пароли не совпадают');
         return false;
      } else{
         setError('');
         return true;
      }
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
         <div className={"mx-auto flex flex-col items-center text-black z-3"}>
            <h1 className={"text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground mb-2 text-center flex items-end gap-[10px]"}>
               Bonum
            </h1>
            <p className={"text-lg text-muted-foreground mb-[32px]"}>Финансовый учет для вашего бизнеса</p>
         </div>
         <div className="flex flex-col gap-[10px] bg-white p-6 max-w-[600px] w-full border border-brown3 shadow-sm rounded-lg z-3">
            <div className={"flex flex-col items-start pb-[24px]"}>
               <UiTitle className="text-black">Регистрация</UiTitle>
               <p className="text-black text-[14px]">Создайте учетную запись для доступа к системе</p>
            </div>
            <div className="flex flex-col gap-[16px]">
               <UiInput label="Email" type={'email'} placeholder="Введите значение" required value={email} onChange={(e) => setEmail(e.target.value)} />
               <div className={'flex w-full flex-col items-center gap-[15px] sm:flex-row sm:gap-[10px]'}>
                  <UiInput label={"Ваше имя"} placeholder="Введите значение" required value={name} onChange={(e)=> setName(e.target.value)} />
                  <UiInput label={"Ваша фамилия"} placeholder="Введите значение" required value={surname} onChange={(e)=> setSurname(e.target.value)} />
               </div>
               <UiInputPassword label="Пароль" placeholder="Введите значение" required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
               <UiInputPassword label="Повторите пароль" required placeholder="Введите значение" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
               {error && <div className={"text-red text-center"}>{error}</div>}
               <UiButton label="Зарегистрироваться" onClick={handleRegister} className="mt-2" />
               <p className="text-black text-[14px] text-center font-normal">Уже есть аккаунт? <span className="underline underline-offset-4 cursor-pointer text-brown4 font-medium" onClick={() => navigate('/login')}>Войти</span></p>
            </div>
         </div>
      </div>
   )
}