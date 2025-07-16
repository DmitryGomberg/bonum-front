import { FC } from 'react'
import {UiButton} from "../../ui/button";
import {useNavigate} from "react-router-dom";

export const ErrorPage : FC = () => {
   const navigate = useNavigate();
  return (
    <div className={'w-screen h-screen flex items-center justify-center bg-brown3 text-[100px] text-brown5 outline-solid font-bold flex-col'}>
       <div className={'bg-white flex flex-col p-5 rounded-xl items-center w-[400px] h-[400px] justify-center'}>
         404
          <UiButton label={'На главную'} onClick={()=>navigate('/home')} />
       </div>
    </div>
  )
}