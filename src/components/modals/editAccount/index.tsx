import {FC, useEffect, useState} from 'react'
import {UiModal} from "../../../ui/modal";
import { UiInput } from '../../../ui/input';
import {UiSelect} from "../../../ui/select";
import {UiButton} from "../../../ui/button";
import {useNotifications} from "../../../context/notifications.tsx";
import {useUserId} from "../../../utils/auth.tsx";
import {fetchCurrencyNames} from "../../../utils/currency.tsx";

type IModalEditAccountProps = {
   active: boolean;
   onClose(): void;
   account_id: number;
   name: string;
   currency_id: number;
   onUpdate: () => void;
}

interface Option {
   id: number;
   label: string;
}

export const ModalEditAccount: FC<IModalEditAccountProps> = (props) => {
   const [name, setName] = useState(props.name ||'')
   const [currency, setCurrency] = useState<number | null>(props.currency_id || null);
   const [loading, setLoading] = useState(false);
   const [currencyOptions, setCurrencyOptions] = useState<Option[]>([]);
   const {showNotification} = useNotifications();

   // Загрузка валют при монтировании компонента
   useEffect(() => {
      const loadCurrencies = async () => {
         try {
            const currencyNames = await fetchCurrencyNames(); // ["USD", "EUR", "RUB"]
            // Преобразуем string[] в Option[]
            const options: Option[] = currencyNames.map((name, index) => ({
               id: index + 1, // Генерируем id на основе индекса (начинаем с 1)
               label: name,
            }));
            setCurrencyOptions(options);
         } catch (error) {
            console.error('Ошибка загрузки валют:', error);
            showNotification('Ошибка загрузки валют', 'error');
            setCurrencyOptions([]);
         }
      };
      loadCurrencies();
   }, [showNotification]);

   const userId = useUserId();

   const handleEditAccount = async () => {
      if (!name || currency === null) {
         alert('Please fill in all fields');
         return;
      }

      setLoading(false);

      try {
         const response = await fetch('http://localhost:8080/api/accounts/edit', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               name,
               currency_id: currency,
               user_id: userId,
               account_id: props.account_id
            })
         })

         if(!response.ok) {
            showNotification('Ошибка при редактировании счета', 'error');
            throw new Error('Failed to create account');
         }

         showNotification('Изменения успешно сохранены', 'success');
         props.onUpdate();
         props.onClose();
      }  catch (error) {
         console.error(error);
         showNotification('Ошибка при сохранении изменений', 'error');
      }
   }


  return (
    <UiModal active={props.active} onClose={props.onClose} title={'Редактировать счет'} >
      <UiInput label={'Название счета'} placeholder={'Введите значение'} value={name} onChange={(e)=> setName(e.target.value)} />

       <UiSelect
          label={'Валюта'}
          options={currencyOptions}
          defaultId={props.currency_id}
          placeholder="Выберите валюту"
          onChange={(selected) => setCurrency(selected ? selected.id : null)}
       />

       <UiButton label={'Сохранить изменения'} onClick={handleEditAccount} disabled={loading} />
    </UiModal>
  )
}