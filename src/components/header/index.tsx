import {FC} from 'react';
import {Icon} from "../icon";
import {SettingsOutlined, Menu, Add} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {UiButton} from "../../ui/button";

export const Header: FC<{ onToggleSidebar: () => void }> = ({ onToggleSidebar }) => {
   const navigate = useNavigate();

   return (
      <header className={'sticky top-0 z-4 w-full px-[10px] bg-white border-brown3 border-b min-h-[60px] flex items-center'}>
         <div className={'flex items-center justify-between max-w-[1280px] mx-auto w-full'}>
            <div className={'lg:hidden flex gap-[10px items-center]'}>
               <Icon onClick={onToggleSidebar}>
                  <Menu/>
               </Icon>
               <div
                  className={'flex items-center justify-center gap-[5px] text-black font-bold text-[20px] cursor-pointer pl-2'}
                  onClick={() => {
                     navigate('/home');
                  }}
               >
                  Bonum
               </div>
            </div>

            <UiButton label={'Новая транзакция'} contentLeft={<Add/>} onClick={() => {
               navigate('/createTransaction')
            }} className={'flex md:hidden'}/>

            <div className={'gap-[15px] ml-auto md:flex hidden'}>
               <Icon onClick={() => navigate('/settings')}>
                  <SettingsOutlined className={'text-black'}/>
               </Icon>
            </div>
         </div>
      </header>
   );
};