import { FC } from 'react'
import {UiButton} from "../../ui/button";
import {useNavigate} from "react-router-dom";
import ParticlesBg from "particles-bg";

export const ErrorPage : FC = () => {
   const navigate = useNavigate();
  return (
    <div className={'w-screen h-screen flex items-center justify-center bg-brown2 text-[100px] text-brown5 outline-solid font-bold flex-col'}>
       <ParticlesBg
          type="cobweb" // Тип анимации: круги для звёздочек
          num={60} // Количество частиц
          color="#ffd0a1" // Белые звёздочки для контраста
       />
       <div className={'bg-white flex flex-col p-5 rounded-xl items-center w-[400px] h-[300px] justify-center z-1 border border-brown3'}>
         404
          <span className={'text-[20px] text-black pb-5'}>Упс( Страница не найдена</span>
          <UiButton label={'На главную'} onClick={()=>navigate('/home')} />
       </div>
    </div>
  )
}