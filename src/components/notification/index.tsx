import React from 'react';
import { useNotifications } from '../../context/notifications';
import { Close } from "@mui/icons-material";
import './notification.css'; // Import the CSS file for animations

export const Notification: React.FC = () => {
   const { notifications, closeNotification } = useNotifications();

   return (
      <div className="fixed bottom-0 right-0 p-4 space-y-2 z-50 flex flex-col items-end">
         {notifications.map(({ id, message, type }) => (
            <div
               key={id}
               className={`notification animate-enter ${type === 'success' ? 'bg-white' : type === 'warning' ? 'bg-orange-500 text-white' : 'bg-red-500 text-white'} border border-brown3 text-brown5 px-4 py-2 rounded-lg shadow-lg flex justify-between items-center`}
               onAnimationEnd={(e) => {
                  if (e.animationName === 'exit') closeNotification(id);
               }}
            >
               <span>{message}</span>
               <span className={`${type === 'success' ? 'bg-brown5' : type === 'warning' ? 'bg-white' : 'bg-white'} w-[1px] h-[20px] mx-[15px]`}></span>
               <button onClick={() => closeNotification(id)} className="rounded-[50%] cursor-pointer text-lg font-bold flex align-middle justify-center">
                  <Close />
               </button>
            </div>
         ))}
      </div>
   );
};