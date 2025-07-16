import {FC, ReactNode} from 'react'

type IUiTitleProps = {
   children: ReactNode;
   className?: string;
}
export const UiTitle: FC<IUiTitleProps> = (props) => {
  return (
    <h1 className={'text-[20px] font-bold text-center md:text-[24px] text-black ' + props.className} >
       {props.children}
    </h1>
  )
}