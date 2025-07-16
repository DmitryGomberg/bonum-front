import { FC, useState, useEffect } from 'react';
import { useUserId } from "../../utils/auth.tsx";
import { UiSelect } from "../../ui/select";
import {UiLink} from "../../ui/link";
import {UiButton} from "../../ui/button";
import {Add} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {useNotifications} from "../../context/notifications.tsx";
import {UiTitle} from "../../ui/titles/title";

interface Transaction {
  id: number;
  date: string;
  description: string;
  sum: number;
  type_id: number;
  category_name: string;
  source_account_name: string;
  destination_account_name?: string;
  currency_type: string;
}

const transactionTypes = [
  { id: 1, label: 'Доход' },
  { id: 2, label: 'Расход' },
  { id: 3, label: 'Перевод' },
];

export const TransactionsPage: FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedType, setSelectedType] = useState<number | ''>('');
  const userId = useUserId();
  const navigate = useNavigate();
  const {showNotification} = useNotifications();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/transactions?user_id=${userId}`);
        const data = (await response.json()) as Transaction[];
        setTransactions(data);
        setFilteredTransactions(data);

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data.map((t) => t.category_name)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    fetchTransactions();
  }, []);

  const deleteTransaction = async (transactionId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/api/deleteTransaction/${transactionId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete transaction');
        showNotification('Не удалось удалить транзакцию', 'error');
      }

      const deletedTransaction = await response.json();
      showNotification('Транзакция успешно удалена', 'success');
      console.log('Transaction deleted:', deletedTransaction);

      // Обновление списка транзакций
      const updatedTransactions = transactions.filter((t) => t.id !== transactionId);
      setTransactions(updatedTransactions);
      setFilteredTransactions(updatedTransactions);
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  useEffect(() => {
    let filtered = transactions;

    if (selectedCategory) {
      filtered = filtered.filter((t) => t.category_name === selectedCategory);
    }

    if (selectedType) {
      filtered = filtered.filter((t) => t.type_id === selectedType);
    }

    setFilteredTransactions(filtered);
  }, [selectedCategory, selectedType, transactions]);

  return (
     <div className="p-4 flex flex-col gap-[10px]">
       <div className={'flex items-center justify-between gap-[20px]'}>
        <UiTitle className="text-xl font-bold mb-4">Транзакции</UiTitle>
         <UiButton label={'Добавить'} contentLeft={<Add />} onClick={()=> navigate('/createTransaction')} />
       </div>
       <div className={'p-4 bg-white border border-brown3 rounded-md'}>
         <div className="flex gap-4 mb-4 flex-col md:flex-row">
           <UiSelect
              value={categories.indexOf(selectedCategory)} // Use indexOf to find the correct index
              onChange={(selected) => setSelectedCategory(selected && selected.id !== -1 ? categories[selected.id] : '')}
              options={[{ id: -1, label: 'Все категории' }, ...categories.map((category, index) => ({ id: index, label: category }))]}
              className={'sm:max-w-[220px]'}
              placeholder="Выберите категорию"
           />
           <UiSelect
              value={selectedType !== '' ? selectedType : -1}
              onChange={(selected) => setSelectedType(selected && selected.id !== -1 ? selected.id : '')}
              options={[{ id: -1, label: 'Все типы' }, ...transactionTypes.map((type) => ({ id: type.id, label: type.label }))]}
              className={'sm:max-w-[220px]'}
              placeholder="Выберите тип транзакции"
           />
         </div>

         <div className="border border-brown3 rounded-md overflow-x-auto">
           <div className="min-w-[780px] grid grid-cols-6 gap-4 p-2 px-4 text-white font-bold bg-brown5">
             <span>Дата</span>
             <span>Описание</span>
             <span>Категория</span>
             <span>Счёт</span>
             <span>Сумма</span>
             <span>Перевод на</span>
           </div>
           {filteredTransactions.length > 0 ? filteredTransactions.slice().reverse().map((transaction) => (
              <div
                 key={transaction.id}
                 className="min-w-[780px] grid grid-cols-7 gap-4 p-2 px-4 bg-brown1"
              >
                <span>{transaction.date}</span>
                <span>{transaction.description || ''}</span>
                <span>{transaction.category_name || '-'}</span>
                <span>{transaction.source_account_name}</span>
                <span
                   className={`font-medium ${
                      transaction.type_id === 1
                         ? 'text-green-500'
                         : transaction.type_id === 2
                            ? 'text-red-500'
                            : 'text-black'
                   }`}
                >
                  {transaction.sum} {transaction.currency_type}
                </span>
                <span>{transaction.destination_account_name || '-'}</span>
                <button
                   className="text-red-500 hover:underline"
                   onClick={() => deleteTransaction(transaction.id)}
                >
                  Удалить
                </button>
              </div>
           )) : (
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
  );
};