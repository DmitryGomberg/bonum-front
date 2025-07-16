import { FC } from 'react'
import { UiButton } from '../../../ui/button'
import {Add} from "@mui/icons-material";
import {UiTitle} from "../../../ui/titles/title";
import {useNavigate} from "react-router-dom";

export const HomeControls: FC = () => {
   const navigate = useNavigate();
  return (
    <div className={'flex justify-between items-start'}>
       <UiTitle>Панель управления</UiTitle>
       <UiButton label={'Новая транзакция'} contentLeft={<Add />} onClick={()=>{ navigate('/createTransaction')}} className={'hidden md:flex'}/>
    </div>
  )
}