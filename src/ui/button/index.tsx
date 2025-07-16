import {FC, ReactNode} from 'react'

type IUiButtonProps = {
   className?: string;
   label: string;
   contentLeft?: ReactNode;
   contentRight?: ReactNode;
   onClick(): void;
   disabled?: boolean;
}

export const UiButton: FC<IUiButtonProps> = (props) => {
  return (
    <button className={`text-center text-sm leading-[24px] font-medium bg-brown4 hover:bg-brown5 transition text-white px-[26px] py-[8px] rounded-md cursor-pointer outline-brown4 outline-offset-3 flex items-center justify-center ${props.className}`} onClick={props.onClick} disabled={props.disabled}>
       {props.contentLeft}
       {props.label}
       {props.contentRight}
    </button>
  )
}