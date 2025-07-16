import {ChangeEvent, FC} from 'react'

type IUiTextareaProps = {
   label?: string;
   placeholder?: string;
   value: string;
   error?: boolean;
   required?: boolean;
   className?: string;
   onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export const UiTextarea: FC<IUiTextareaProps> = (props) => {
   return (
      <div className={'w-full flex flex-col gap-[8px]'}>
         {props.label && <label className={`text-black text-[14px] font-medium text-[12px] ${props.error ? 'text-red' : ''}`}>{props.label}{props.required ? <span className={'text-red'}>*</span> : ''}</label> }
         <textarea
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            className={`h-[90px] resize-none bg-brown1 border border-brown3 rounded-md px-[12px] py-[8px] text-[14px] text-black font-normal outline-brown4 outline-offset-4 ${props.className}`}
         />
      </div>
   )
}