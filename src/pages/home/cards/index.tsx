import { FC, useEffect, useState } from 'react';
import { AttachMoney, ShoppingCartOutlined, WalletOutlined } from "@mui/icons-material";
import { HomeCard } from "./card";
import { useUserId } from "../../../utils/auth.tsx";

interface Transaction {
   id: number;
   sum: number;
   type_id: number;
   date: string;
   currency_type: string; // e.g., "USD" or "BYN"
}

export const HomeCards: FC = () => {
   const [income, setIncome] = useState<number>(0);
   const [expense, setExpense] = useState<number>(0);
   const [exchangeRate, setExchangeRate] = useState<number>(3.1);
   const userId = useUserId();

   useEffect(() => {
      const fetchExchangeRate = async () => {
         try {
            const response = await fetch('https://api.nbrb.by/exrates/rates/431');
            if (!response.ok) {
               throw new Error('Failed to fetch exchange rate');
            }
            const data = await response.json();
            setExchangeRate(data.Cur_OfficialRate);
         } catch (error) {
            console.error('Error fetching exchange rate:', error);
         }
      };

      const fetchTransactions = async () => {
         try {
            const response = await fetch(`http://localhost:8080/api/transactions?user_id=${userId}`);
            if (!response.ok) {
               throw new Error('Failed to fetch transactions');
            }
            const data: Transaction[] = await response.json();

            const currentMonth = new Date().getMonth();
            const currentYear = new Date().getFullYear();
            const monthlyTransactions = data.filter((transaction) => {
               const transactionDate = new Date(transaction.date);
               return (
                  transactionDate.getMonth() === currentMonth &&
                  transactionDate.getFullYear() === currentYear
               );
            });

            const totalIncome = monthlyTransactions
               .filter((t) => t.type_id === 1)
               .reduce((sum, t) => {
                  const amountInBYN = t.currency_type === 'USD' ? Number(t.sum) * exchangeRate : Number(t.sum);
                  return sum + amountInBYN;
               }, 0);

            const totalExpense = monthlyTransactions
               .filter((t) => t.type_id === 2)
               .reduce((sum, t) => {
                  const amountInBYN = t.currency_type === 'USD' ? Number(t.sum) * exchangeRate : Number(t.sum);
                  return sum + amountInBYN;
               }, 0);

            setIncome(totalIncome);
            setExpense(totalExpense);
         } catch (error) {
            console.error('Error fetching transactions:', error);
         }
      };

      fetchExchangeRate();
      fetchTransactions();
   }, [userId, exchangeRate]);

   const netProfit = income - expense;

   return (
      <div className={'grid grid-cols-1 gap-4 md:grid-cols-3'}>
         <HomeCard
            icon={<WalletOutlined />}
            name={'Доходы в этом месяце'}
            sum={`${Number(income).toFixed(2)} BYN`}
            navigateTo={'transactions'}
         />
         <HomeCard
            icon={<ShoppingCartOutlined />}
            name={'Расходы в этом месяце'}
            sum={`${Number(expense).toFixed(2)} BYN`}
            navigateTo={'transactions'}
         />
         <HomeCard
            icon={<AttachMoney />}
            name={'Чистая прибыль'}
            sum={`${Number(netProfit).toFixed(2)} BYN`}
            navigateTo={''}
         />
      </div>
   );
};