import {ChangeEvent, FC, ReactNode} from 'react'

type IUiInputProps = {
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

export const UiInput: FC<IUiInputProps> = (props) => {
   return (
      <div className={'w-full flex flex-col gap-[8px] relative'}>
         {props.label && <label className={`text-black text-[14px] font-medium text-[12px] ${props.error ? 'text-red' : ''}`}>{props.label}{props.required ? <span className={'text-red'}>*</span> : ''}</label> }
         <input
            type={props.type || 'text'}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            className={`bg-brown1 border border-brown3 rounded-md px-[12px] py-[8px] text-[14px] text-black font-normal outline-brown4 outline-offset-4 ${props.className}`}
         />
         {props.contentRight ?
             <div className={'absolute right-[5px] text-black bottom-[5px] cursor-pointer w-[30px] h-[30px] flex items-center justify-center'}>
                 {props.contentRight}
             </div>
            : null
         }
      </div>
   )
}