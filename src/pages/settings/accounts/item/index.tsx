import {FC, useEffect, useState} from 'react'
import {DeleteOutlined, EditOutlined} from "@mui/icons-material";
import {ModalEditAccount} from "../../../../components/modals/editAccount";
import {ModalConfirm} from "../../../../components/modals/confirm";
import { fetchCurrencyNames } from '../../../../utils/currency';
import {useUserId} from "../../../../utils/auth.tsx";
import {useNotifications} from "../../../../context/notifications.tsx";

type ISettingsAccountProps = {
   id: number;
   name: string;
   currency: number;
   onUpdate: () => void;
}

export const SettingsAccount: FC<ISettingsAccountProps> = (props) => {
   const [activeModalEdit, setActiveModalEdit] = useState(false);
   const [activeModalDelete, setActiveModalDelete] = useState(false);
   const [currencyName, setCurrencyName] = useState<string | null>(null);
   const {showNotification} = useNotifications();
   const userId = useUserId();

   useEffect(() => {
      const loadCurrencyName = async () => {
         try {
            const currencyNames = await fetchCurrencyNames();
            setCurrencyName(currencyNames[props.currency - 1] || 'Unknown');
         } catch (error) {
            console.error('Failed to fetch currency name:', error);
            setCurrencyName('Unknown');
         }
      };

      loadCurrencyName();
   }, [props.currency]);

   const handleDeleteAccount = async () => {
      try {
         const response = await fetch('http://localhost:8080/api/accounts/delete', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               account_id: props.id,
               user_id: userId,
            }),
         });

         if (!response.ok) {
            showNotification('Ошибка при удалении счета', 'error');
            throw new Error('Failed to delete account');
         }

         props.onUpdate();
         showNotification('Счет успешно удален', 'success');
         setActiveModalDelete(false);
      } catch (error) {
         console.error('Error deleting account:', error);
      }
   };

  return (
     <div>
       <div className={'flex items-center justify-between bg-white p-4 border border-brown3 rounded-xl text-black'}>
          <p className={'font-bold flex-[20%]'}>{props.name}</p>
          <p className={'font-bold grow text-center'}>{currencyName || 'Loading...'}</p>
          <div className={'flex gap-[10px]'}>
             <EditOutlined className={'cursor-pointer transition hover:text-brown4'} onClick={()=>setActiveModalEdit(true)} />
             <DeleteOutlined className={'cursor-pointer transition hover:text-red'} onClick={()=> setActiveModalDelete(true)} />
          </div>
       </div>
        <ModalEditAccount active={activeModalEdit} onClose={()=> setActiveModalEdit(false)} account_id={props.id} name={props.name} currency_id={props.currency} onUpdate={props.onUpdate}  />
        <ModalConfirm title={'Вы уверены что хотите удалить счет?'} onClose={()=> setActiveModalDelete(false)} active={activeModalDelete} onConfirm={handleDeleteAccount} onUpdate={props.onUpdate}  />
     </div>
  )
}