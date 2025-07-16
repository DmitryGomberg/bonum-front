import {FC, ReactNode, useState} from 'react'

type ISettingsCategoryButtonProps = {
  icon: ReactNode;
  text: string;
  className?: string;
  onClick?(): void;
}

export const SettingsCategoryButton: FC<ISettingsCategoryButtonProps> = (props) => {
  const [showButton, setShowButton] = useState(false);

  return (
     <div className={`relative ${props.className}`}>
       <div
          className="flex items-center gap-2"
          onMouseOver={() => setShowButton(true)}
          onMouseOut={() => setShowButton(false)}>

         <div
            className="flex items-center"
            onClick={props.onClick}
         >
           {props.icon}
         </div>
       </div>
       <div
          className={`absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-brown4 text-white text-[10px] text-center leading-none rounded-md opacity-0 transition-opacity duration-300 ${
             showButton ? 'opacity-100 visible' : ' invisible'
          }`}
       >
         {props.text}
       </div>
     </div>
  )
}