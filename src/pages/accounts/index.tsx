import { FC, useEffect, useState } from 'react';
import { UiTitle } from "../../ui/titles/title";
import { AccountPageItem } from "./item";
import { UiSkeleton } from "../../ui/skeleton";
import { useUserId } from "../../utils/auth.tsx";
import {ModalCreateAccount} from "../../components/modals/createAccount";
import {UiButton} from "../../ui/button";
import {Add} from "@mui/icons-material";

interface Account {
   id: number;
   name: string;
   value: number;
   currency: number;
}
interface ServerAccount {
   id: number;
   name: string;
   currency_id: number;
}
interface Transaction {
   id: number;
   account_id: number;
   account_to_id?: number;
   category_name?: string;
   sum: number;
   type_id?: number;
   price_course?: number;
}

export const AccountsPage: FC = () => {
   const [activeModal, setActiveModal] = useState(false);
   const [dollarRate, setDollarRate] = useState<number | undefined>();
   const [accounts, setAccounts] = useState<Account[]>([]);
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const userId = useUserId();

   const getRate = async () => {
      try {
         const response = await fetch('https://api.nbrb.by/exrates/rates/431', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
         });
         if (response.ok) {
            const data = await response.json();
            setDollarRate(data.Cur_OfficialRate);
         } else {
            console.error('Не удалось получить данные о курсе доллара');
         }
      } catch (error) {
         console.error('Error:', error);
      }
   };

   const fetchAccounts = async () => {
      if (!userId) {
         setError('ID пользователя не найден');
         setLoading(false);
         return;
      }

      try {
         const response = await fetch(`http://localhost:8080/api/accounts?user_id=${userId}`);
         if (!response.ok) {
            throw new Error('Failed to fetch accounts');
         }

         const accountsData: ServerAccount[] = await response.json();

         // Fetch transactions for all accounts
         const transactionsResponse = await fetch(`http://localhost:8080/api/transactions?user_id=${userId}`);
         if (!transactionsResponse.ok) {
            throw new Error('Failed to fetch transactions');
         }

         const transactions: Transaction[] = await transactionsResponse.json();

         const accountsWithValues = accountsData.map((account) => {
            const accountTransactions = transactions.filter(
               (transaction) => transaction.account_id === account.id || transaction.account_to_id === account.id
            );

            const totalSum = accountTransactions.reduce((sum, transaction) => {
               let transactionSum = parseFloat(transaction.sum.toString());

               if (transaction.type_id === 3 && transaction.price_course) {
                  const fromAccount = accountsData.find(acc => acc.id === transaction.account_id);
                  const toAccount = accountsData.find(acc => acc.id === transaction.account_to_id);

                  const fromCurrency = fromAccount ? fromAccount.currency_id : undefined;
                  const toCurrency = toAccount ? toAccount.currency_id : undefined;


                  if (fromCurrency === 1 && toCurrency === 2) { // BYN to USD

                     transactionSum = transactionSum * transaction.price_course;
                     console.log(transactionSum)
                  } else if (fromCurrency === 2 && toCurrency === 1) { // USD to BYN
                     transactionSum = transactionSum / transaction.price_course;
                     console.log(transactionSum)
                  }
               }

               if (transaction.type_id === 1) {
                  // Income
                  return sum + transactionSum;
               } else if (transaction.type_id === 2) {
                  // Expense
                  return sum - transactionSum;
               } else if (transaction.type_id === 3) {
                  if (transaction.account_id === account.id) {
                     // Subtract the original amount (in the source account's currency)
                     return sum - parseFloat(transaction.sum.toString());
                  } else if (transaction.account_to_id === account.id) {
                     // Add the converted amount (in the destination account's currency)
                     if (transaction.price_course) {
                        const fromAccount = accountsData.find(acc => acc.id === transaction.account_id);
                        const toAccount = accountsData.find(acc => acc.id === transaction.account_to_id);

                        const fromCurrency = fromAccount ? fromAccount.currency_id : undefined;
                        const toCurrency = toAccount ? toAccount.currency_id : undefined;

                        let convertedSum = parseFloat(transaction.sum.toString());
                        console.log(convertedSum)
                        if (fromCurrency === 1 && toCurrency === 2) { // BYN to USD
                           convertedSum = convertedSum * transaction.price_course;
                        } else if (fromCurrency === 2 && toCurrency === 1) { // USD to BYN
                           convertedSum = convertedSum * transaction.price_course;
                        }
                        return sum + convertedSum;
                     }
                  }
               }

               return sum;
            }, 0);

            return {
               id: account.id,
               name: account.name,
               value: totalSum,
               currency: account.currency_id,
            };
         });

         setAccounts(accountsWithValues);
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
      getRate();
   }, [activeModal]);

   return (
      <>
      <div>
         <div className={'max-w-[800px] mx-auto flex flex-col gap-[20px]'}>
            <div className={'flex items-center justify-between'}>
               <UiTitle>Счета</UiTitle>
               <UiButton label={'Добавить'} contentLeft={<Add />} onClick={()=> setActiveModal(true)} />
            </div>
            {loading ? (
               <p>Loading...</p>
            ) : error ? (
               <p className="text-red-500">{error}</p>
            ) : accounts.length > 0 ? (
               <div className={'flex flex-col gap-[10px]'}>
                  {accounts.map((account) => (
                     <AccountPageItem
                        key={account.id}
                        id={account.id}
                        name={account.name}
                        value={account.value}
                        currency={account.currency === 1 ? 'BYN' : 'USD'}
                     />
                  ))}
                  <span className={'h-[1px] bg-brown5'}/>
                  <div className={'flex flex-col items-end'}>
                     <p className={'text-right text-black'}>
                        Всего: {accounts.reduce((sum, acc) => sum + acc.value * (acc.currency === 2 && dollarRate ? dollarRate : 1), 0).toFixed(2)} BYN
                     </p>
                     <span className={'text-[12px] text-gray-500 flex items-center gap-[5px]'}>
                        по курсу 1 USD = {dollarRate ? dollarRate : <UiSkeleton width={'37px'} height={'13px'}/>} BYN
                     </span>
                  </div>
               </div>
            ) : (
               <div className={'py-4 border border-brown3 px-8 rounded-xl bg-white'}>
                  <p className={'text-[14px] text-black text-center w-full'}>Вы пока не создали счет!</p>
                  <div className={'text-brown5 text-[14px] font-medium cursor-pointer text-center'}
                       onClick={() => setActiveModal(true)}>
                     Создать счет
                  </div>
               </div>
            )}
         </div>
      </div>
      <ModalCreateAccount active={activeModal} onClose={() => setActiveModal(false)}/>
      </>
   );
};