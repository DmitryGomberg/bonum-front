import { FC, useState } from 'react';
import { UiModal } from "../../../ui/modal";
import { UiButton } from "../../../ui/button";
import { useUserId } from '../../../utils/auth';
import {UiInput} from "../../../ui/input";

type IModalCreateCategoryProps = {
   active: boolean;
   parentId: number | null;
   onClose(): void;
};

export const ModalCreateCategory: FC<IModalCreateCategoryProps> = (props) => {
   const userId = useUserId();
   const [name, setName] = useState('');
   const [icon, setIcon] = useState('');
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);

   const handleCreateCategory = async () => {
      if (!name || !icon) {
         setError('Name and icon are required');
         return;
      }

      setLoading(true);
      setError(null);

      try {
         const response = await fetch('http://localhost:8080/api/createCategory', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               name,
               icon,
               user_id: userId,
               parent_id: props.parentId,
            }),
         });

         if (!response.ok) {
            throw new Error('Failed to create category');
         }

         props.onClose();
         setName('');
         setIcon('');
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

   return (
      <UiModal active={props.active} onClose={props.onClose} title={'Создать новую категорию'}>
         <div className="flex flex-col gap-4">
            {error && <div className="text-red-500">{error}</div>}
            <UiInput
               placeholder="Введите значение"
               label={'Название категории'}
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <UiInput
               placeholder="Введите значение"
               label={'Иконка категории'}
               value={icon}
               onChange={(e) => setIcon(e.target.value)}
            />
            <UiButton label={'Создать'} onClick={handleCreateCategory} disabled={loading} />
         </div>
      </UiModal>
   );
};