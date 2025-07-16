import {FC, useState} from 'react'

type IUiTabsProps = {
   values: {id: number; label: string}[]
   onClick(e:number): void;
}

export const UiTabs: FC<IUiTabsProps> = (props) => {
   const [active, setActive] = useState<{id: number; label: string}>(props.values[0])

  return (
    <div className={'inline-flex self-center rounded-xl bg-brown2 text-black'}>
       {props.values.map((item)=>{
          return <button onClick={()=> {
             setActive(item)
             props.onClick(item.id)
          }} key={item.id} className={`${(active.id === item.id) && 'bg-brown4 text-white'} outline-brown4 font-medium transition cursor-pointer px-5 py-3 rounded-xl`}>{item.label}</button>
       })}
    </div>
  )
}