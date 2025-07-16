import {FC, ReactNode} from 'react'

type IIconProps = {
   children: ReactNode;
   onClick?(): void;
}

export const Icon: FC<IIconProps> = (props) => {
  return (
    <div className={"w-[40px] h-[40px] flex items-center justify-center rounded-md hover:bg-brown2 transition cursor-pointer"} onClick={props.onClick}>
       {props.children}
    </div>
  )
}