import {FC} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {
   ChecklistOutlined, ReceiptOutlined, SettingsOutlined, SpaceDashboardOutlined, Close
} from "@mui/icons-material";
import {useUser} from "../../context/user.tsx";

type SidebarProps = {
   isOpen: boolean;
   onClose: () => void;
};

export const Sidebar: FC<SidebarProps> = ({ isOpen, onClose }) => {
   const { user } = useUser();
   const navigate = useNavigate();

   return (
      <>
         {isOpen && (
            <div
               className="fixed inset-0 bg-brown4/80 backdrop-blur-md z-40"
               onClick={onClose}
            ></div>
         )}

         <div
            className={`fixed top-0 left-0 h-screen bg-white border-r border-brown3 transition-transform ${
               isOpen ? 'translate-x-0' : '-translate-x-full'
            } lg:translate-x-0 lg:static lg:min-w-[255px] flex flex-col z-50`}
         >
            <div className={'flex gap-[10px] w-full justify-between border-b border-brown3'}>
               <div
                  className={'h-[60px] flex items-center justify-center gap-[5px] text-black font-bold text-[20px] cursor-pointer pl-6'}
                  onClick={() => {
                     navigate('/home');
                     onClose();
                  }}
               >
                  Bonum
               </div>
               <div className={'lg:hidden flex justify-end p-2'}>
                  <button
                     className={'p-2 rounded-full hover:bg-brown2 transition'}
                     onClick={onClose}
                  >
                     <Close/>
                  </button>
               </div>
            </div>
            <div className={'p-3'}>
               <ul>
                  <li
                     className={'flex gap-[10px] rounded-md hover:bg-brown2 transition cursor-pointer text-black'}
                     onClick={onClose}
                  >
                     <Link to={"/home"} className={'flex gap-[10px] w-full p-2'}>
                        <SpaceDashboardOutlined/>
                        Панель управления
                     </Link>
                  </li>
                  <li
                     className={'flex gap-[10px] rounded-md hover:bg-brown2 transition cursor-pointer text-black'}
                     onClick={onClose}
                  >
                     <Link to={"/accounts"} className={'flex gap-[10px] w-full p-2'}>
                        <ChecklistOutlined/>
                        Счета
                     </Link>
                  </li>
                  <li
                     className={'flex gap-[10px] rounded-md hover:bg-brown2 transition cursor-pointer text-black'}
                     onClick={onClose}
                  >
                     <Link to={"/transactions"} className={'flex gap-[10px] w-full p-2'}>
                        <ReceiptOutlined/>
                        Транзакции
                     </Link>
                  </li>
               </ul>
            </div>
            <div className={'p-3 border-t border-brown3'}>
               <ul>
                  <li
                     className={'flex gap-[10px] rounded-md hover:bg-brown2 transition cursor-pointer text-black'}
                     onClick={onClose}
                  >
                     <Link to={"/settings"} className={'p-2 flex gap-[10px] w-full'}>
                        <SettingsOutlined/>
                        Настройки
                     </Link>
                  </li>
               </ul>
            </div>
            <div className={'p-3 mt-auto border-t border-brown3 flex items-center gap-[10px]'}>
               <div
                  className={'w-[40px] h-[40px] rounded-[50%] bg-brown5 flex items-center justify-center text-white'}
               >
                  {user.username ? user.username.slice(0, 2).toUpperCase() : ''}
               </div>
               <div>
                  <p className={'font-medium text-black'}>
                     {user.name || user.surname ? user.name + ' ' + user.surname : ''}
                  </p>
                  <p className={'text-[12px] text-black'}>{user.username}</p>
               </div>
            </div>
         </div>
      </>
   );
};