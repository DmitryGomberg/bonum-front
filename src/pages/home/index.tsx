import { FC } from 'react'
import { HomeCards } from './cards'
import {HomeControls} from "./controls";
import {HomeTransactions} from "./transactions";

export const HomePage: FC = () => {
  return (
    <div className={'flex flex-col gap-[20px]'}>
       <HomeControls />
       <HomeCards />
       <HomeTransactions />
    </div>
  )
}