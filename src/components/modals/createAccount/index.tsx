import {FC, useEffect, useState} from 'react'
import {UiModal} from "../../../ui/modal";
import { UiInput } from '../../../ui/input';
import {UiSelect} from "../../../ui/select";
import {UiButton} from "../../../ui/button";
import { useUserId } from '../../../utils/auth';
import {useNotifications} from "../../../context/notifications.tsx";
import { fetchCurrencyNames } from '../../../utils/currency.tsx';

type IModalCreateAccountProps = {
   active: boolean;
   onClose(): void;
}

interface Option {
   id: number;
   label: string;
}

export const ModalCreateAccount: FC<IModalCreateAccountProps> = (props) => {
   const [name, setName] = useState('')
   const [currency, setCurrency] = useState<number | null>(null);
   const [currencyOptions, setCurrencyOptions] = useState<Option[]>([]);
   const [loading, setLoading] = useState(false);
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

   const userId = useUserId()

   const handleCreateAccount = async () => {
      if (!name || currency === null) {
         alert('Please fill in all fields');
         return;
      }

      setLoading(true);

      try {
         const response = await fetch('https://bonum-back-production.up.railway.app/api/accounts', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               name,
               value: 0,
               currency_id: currency,
               user_id: userId,
            }),
         });

         if (!response.ok) {
            showNotification('Ошибка при создании счета', 'error');
            throw new Error('Failed to create account');
         }


         showNotification('Счет успешно создан', 'success');
         props.onClose();
         setName('')
         setCurrency(null)

      } catch (error) {
         console.error(error);
         showNotification('Ошибка при создании счета', 'error');
      } finally {
         setLoading(false);
      }
   };

  return (
    <UiModal active={props.active} onClose={props.onClose} title={'Создать новый счет'} >
      <UiInput label={'Название счета'} placeholder={'Введите значение'} value={name} onChange={(e)=> setName(e.target.value)} />

       <UiSelect
          value={currency || null}
          label={'Валюта'}
          options={currencyOptions}
          placeholder="Выберите валюту"
          onChange={(selected) => setCurrency(selected ? selected.id : null)}
       />

       <UiButton label={'Создать'} onClick={handleCreateAccount} disabled={loading} />
    </UiModal>
  )
}