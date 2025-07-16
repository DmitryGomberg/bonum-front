import {FC, ReactNode} from 'react'
import { UiLink } from '../../../../ui/link';

type IHomeCardProps = {
  icon: ReactNode;
  name: string;
  sum: string;
  navigateTo: string;
}

export const HomeCard: FC<IHomeCardProps> = (props) => {
  return (
     <div className={'border border-brown3 rounded-xl bg-brown1 overflow-hidden text-black bg-white'}>
       <div className={'p-3 py-3 flex items-center gap-[15px] md:py-6'}>
         {props.icon}
         <div className={'flex flex-col'}>
           {props.name}
           <span className={'font-medium'}>{props.sum}</span>
         </div>
       </div>
       <div className={'bg-brown2 p-3 cursor-pointer hidden md:flex'}>
          <UiLink goto={`/${props.navigateTo}`}>
            Показать все
          </UiLink>
       </div>
     </div>
  )
}