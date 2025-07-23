import {FC, useEffect, useState} from 'react'
import {SettingsAccount} from "./item";
import {UiButton} from "../../../ui/button";
import {Add} from "@mui/icons-material";
import {ModalCreateAccount} from "../../../components/modals/createAccount";
import {useUserId} from "../../../utils/auth.tsx";

interface Account {
   id: number;
   name: string;
   value: number;
   currency: number;
}
interface ServerAccount {
   id: number;
   name: string;
   value: number;
   currency_id: number;
}

export const SettingsAccounts: FC = () => {
   const [activeModal, setActiveModal] = useState(false);
   const [accounts, setAccounts] = useState<Account[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);
   const userId = useUserId();

   const fetchAccounts = async () => {
      if (!userId) {
         setError('User ID not found');
         setLoading(false);
         return;
      }

      try {
         const response = await fetch(`https://bonum-back-production.up.railway.app/api/accounts?user_id=${userId}`);
         if (!response.ok) {
            throw new Error('Failed to fetch accounts');
         }

         const data = await response.json();

         const transformedAccounts: Account[] = data.map((account: ServerAccount) => ({
            id: account.id,
            name: account.name,
            currency: account.currency_id,
         }));

         setAccounts(transformedAccounts);

      } catch (error) {
         if (error instanceof Error) {
            setError(error.message);
         } else {
            setError('An unknown error occurred');
         }
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchAccounts();
   }, [userId, activeModal]);

   if (loading) return <div className={'max-w-[800px] mx-auto w-full'}>Loading...</div>;
   if (error) return <div>Error: {error}</div>;
   
  return (
     <div className={'flex flex-col gap-3 max-w-[800px] mx-auto w-full'}>
        <div className={'flex items-center justify-between'}>
           <p className={'font-medium text-[18px] text-center text-black'}>
              Счета пользователя
           </p>
           <UiButton label={'Добавить'} contentLeft={<Add/>} onClick={() => setActiveModal(true)}
                     className={'self-end'}/>
        </div>
        <div className={'flex flex-col gap-[10px]'}>
           {accounts.length ? (accounts.map((account) => (
              <SettingsAccount currency={account.currency} name={account.name} id={account.id}
                               onUpdate={fetchAccounts}/>
           ))) : (
              <div className={'py-4 border border-brown3 px-8 rounded-xl bg-white text-black'}>
                 <p className={'text-[14px] text-black text-center w-full'}>Вы пока не создали счет!</p>
                 <div className={'text-brown5 text-[14px] font-medium cursor-pointer text-center'} onClick={() => setActiveModal(true)}>
                    Создать счет
                 </div>
              </div>
           )}
        </div>
        <ModalCreateAccount active={activeModal} onClose={() => setActiveModal(false)}/>
     </div>
  )
}