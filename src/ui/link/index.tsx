import {FC, ReactNode} from 'react'
import {useNavigate} from "react-router-dom";

type IUiLinkProps = {
   children: ReactNode;
   className?: string;
   goto?: string;
}

export const UiLink: FC<IUiLinkProps> = (props) => {
   const navigate = useNavigate();
  return (
    <div className={`text-brown5 text-[14px] font-medium cursor-pointer + ${props.className}`} onClick={()=> navigate(`${props.goto}`)}>
       {props.children}
    </div>
  )
}