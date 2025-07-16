import { FC } from 'react'

type IAccountPageItemProps = {
   id: number
   name: string
   currency: string
   value: number
}

export const AccountPageItem: FC<IAccountPageItemProps> = (props) => {

  return (
     <>
        <div className={'bg-white border border-brown3 rounded-xl px-2 py-2 flex items-center'}>
           <p className={'font-medium text-[14px] md:text-[18px] md:px-3 max-w-[60%] w-full text-black'}>
              {props.name}
           </p>
           <div className={'whitespace-nowrap ml-auto flex items-center gap-[10px] text-black'}>
              <span className={'whitespace-nowrap w-full text-center font-bold'}>
                 {props.value.toFixed(2)}
              </span>
              {props.currency}
           </div>
        </div>
     </>
  )
}