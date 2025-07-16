import {FC, useState} from 'react'
import {UiTabs} from "../../ui/tabs";
import {SettingsCategories} from "./categories";
import {SettingsAccounts} from "./accounts";
import {SettingsUser} from "./user";

export const SettingsPage: FC = () => {
  const [part, setPart] = useState<number>(1)

  return (
    <div className={'flex flex-col gap-[20px]'}>
      <UiTabs values={[{id: 1, label: 'Категории'}, {id: 2, label: 'Счета'}, {id: 3, label: 'Профиль'}]} onClick={(e)=>{setPart(e)}} />
      {part===1 && <SettingsCategories />}
      {part===2 && <SettingsAccounts />}
      {part===3 && <SettingsUser />}
    </div>
  )
}