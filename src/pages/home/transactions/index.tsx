import { FC, useEffect, useState } from 'react';
import { UiSubtitle } from '../../../ui/titles/subtitle';
import { UiLink } from '../../../ui/link';
import {useUserId} from "../../../utils/auth.tsx";

interface Transaction {
   id: number;
   description: string;
   date: string;
   sum: number;
   type_id: number;
   category_id: number;
   account_id: number;
   account_to_id?: number;
   currency_type: string;
   source_account_name: string;
   destination_account_name?: string;
   category_name: string;
}

export const HomeTransactions: FC = () => {
   const [transactions, setTransactions] = useState<Transaction[]>([]);
   const [loading, setLoading] = useState<boolean>(true);
   const userId = useUserId();

   useEffect(() => {
      const fetchTransactions = async () => {
         try {
            const response = await fetch(`http://localhost:8080/api/transactions?user_id=${userId}`);
            if (!response.ok) {
               throw new Error('Failed to fetch transactions');
            }
            const data = await response.json();
            setTransactions(data);
         } catch (error) {
            console.error('Error fetching transactions:', error);
         } finally {
            setLoading(false);
         }
      };

      fetchTransactions();
   }, [userId]);

   return (
      <div className={'flex flex-col gap-[15px]'}>
         <div className={'flex justify-between items-center'}>
            <UiSubtitle>Последние транзакции</UiSubtitle>
            <UiLink goto={'/transactions'}>Показать все</UiLink>
         </div>
         <div className={'border border-brown3 px-3 py-1 rounded-xl bg-white md:px-8 md:py-3'}>
            <div className={'overflow-x-auto'}>
               <div className={'min-w-[670px] flex flex-col gap-[5px]'}>
                  {loading ? (
                     <p className={'text-[14px] text-black text-center w-full'}>Загрузка...</p>
                  ) : transactions.length > 0 ? (
                     transactions.slice().reverse().map((transaction) => (
                        <div key={transaction.id}
                             className="flex justify-between items-center border-b border-brown3 last:border-b-0 py-2 text-[14px]">
                           <span className="text-black flex-[1] max-w-[100px] md:max-w-[100%]">{transaction.date}</span>
                           <span className="text-black flex-[1] max-w-[100px] md:max-w-[100%]"><span
                              className={'px-2 py-1 border border-brown3 rounded-md leading-0 text-[11px] font-medium'}>{transaction.category_name || 'Не указана'}</span></span>
                           <span className="text-black truncate flex-[1]">{transaction.description || ''}</span>
                           <span className="text-black flex-[1]">
                              {transaction.source_account_name}
                              {transaction.destination_account_name && ` → ${transaction.destination_account_name}`}
                           </span>
                           <span
                              className={`font-medium flex-[1] text-right max-w-[100px] ${
                                 transaction.type_id === 1
                                    ? 'text-green-500'
                                    : transaction.type_id === 2
                                       ? 'text-red-500'
                                       : 'text-black'
                              }`}
                           >
                              {transaction.sum} {transaction.currency_type}
                           </span>
                        </div>
                     ))
                  ) : (
                     <div className={'py-4'}>
                        <p className={'text-[14px] text-black text-center w-full'}>Транзакции не найдены</p>
                        <UiLink className={'text-center'} goto={'/createTransaction'}>
                           Создать первую транзакцию
                        </UiLink>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};