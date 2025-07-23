import React, {FC, ReactNode, useEffect} from 'react'
import {Close} from "@mui/icons-material";

type IUiModalProps = {
   active: boolean;
   children: ReactNode;
   title: string;
   onClose(): void;
   className?: string;
}

export const UiModal: FC<IUiModalProps> = (props) => {

   useEffect(() => {
      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === 'Escape') {
            props.onClose();
         }
      };
      if (props.active) {
         window.addEventListener('keydown', handleKeyDown);
      }
      return () => {
         window.removeEventListener('keydown', handleKeyDown);
      };
   }, [props.active, props.onClose]);

   const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (event.target === event.currentTarget) {
         props.onClose();
      }
   };

   return (
    <div className={`z-100 fixed w-screen h-screen top-0 right-0 bg-brown3/70 backdrop-blur-sm transition flex items-center justify-center ${props.active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
         onClick={handleBackdropClick}>
       <div className={`transition flex flex-col mx-3 max-w-[450px] w-full border border-brown3 rounded-2xl ${props.active ? 'translate-y-0' : 'translate-y-4'}`}>
         <div className={'bg-brown4 p-3 px-5 text-white flex items-center justify-between text-[20px] font-medium rounded-t-2xl overflow-hidden]'}>
            {props.title}
            <Close onClick={props.onClose} className={'cursor-pointer'} />
         </div>
          <div className={`p-3 px-5 bg-white rounded-b-2xl flex flex-col gap-[15px] ${props.className}`}>
             {props.children}
          </div>
       </div>
    </div>
  )
}