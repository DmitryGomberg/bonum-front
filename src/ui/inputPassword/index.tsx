import {ChangeEvent, FC, ReactNode, useState} from 'react'
import {UiInput} from "../input";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type IUiInputPasswordProps = {
   label?: string;
   type?: string;
   placeholder?: string;
   value: string;
   error?: boolean;
   required?: boolean;
   className?: string;
   onChange: (e: ChangeEvent<HTMLInputElement>) => void;
   contentRight?: ReactNode
}

export const UiInputPassword: FC<IUiInputPasswordProps> = (props) => {
   const [passwordVisible, setPasswordVisible] = useState(false)

   function handlePasswordInput () {
      return passwordVisible ? setPasswordVisible(false) : setPasswordVisible(true)
   }

   return (
      <div>
       <UiInput
          label={props.label}
          className={props.className}
          onChange={props.onChange}
          value={props.value}
          placeholder={props.placeholder}
          type={passwordVisible ? 'text' : 'password'}
          contentRight={<div onClick={handlePasswordInput} >{passwordVisible ?  <VisibilityOff /> : <Visibility />}</div>}
          error={props.error}
          required={props.required} />
      </div>
   )
}