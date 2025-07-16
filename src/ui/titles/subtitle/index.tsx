import {FC, ReactNode} from 'react'

type IUiSubtitleProps = {
   children: ReactNode;
   className?: string;
}
export const UiSubtitle: FC<IUiSubtitleProps> = (props) => {
  return (
    <h1 className={'text-[18px] font-bold text-black ' + props.className} >
       {props.children}
    </h1>
  )
}