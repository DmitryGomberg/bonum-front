import { FC, ReactNode, useState } from 'react';
import { AddBox, ArrowDropDownCircle } from '@mui/icons-material';
import { SettingsCategoryButton } from './button.tsx';
import { ModalCreateCategory } from '../../../../components/modals/createCategory';

type ISettingsCategoryProps = {
   id: number;
   title: string;
   icon: ReactNode;
   onCategoryAdded(): void;
   onToggleExpand(): void;
   isExpanded: boolean;
   hasChildren: boolean;
};

export const SettingsCategory: FC<ISettingsCategoryProps> = (props) => {
   const [modalActive, setModalActive] = useState(false);

   return (
      <>
         <div className={'flex items-center justify-between bg-brown3 py-3 px-6 rounded-xl cursor-pointer'}>
            <div className={'font-bold text-[17px] flex items-center gap-[15px] text-black'}>
               {props.title}
            </div>
            <div className={'flex items-center gap-[10px]'}>
               {/*<SettingsCategoryButton icon={<Edit className={'cursor-pointer'} />} text={'Редактировать'} />*/}
               {props.hasChildren && (
                  <SettingsCategoryButton
                     icon={<ArrowDropDownCircle className={'cursor-pointer'} />}
                     text={'Развернуть'}
                     onClick={props.onToggleExpand}
                     className={'text-brown5'}
                  />
               )}
               <SettingsCategoryButton
                  icon={<AddBox className={'cursor-pointer'} />}
                  text={'Добавить подкатегорию'}
                  onClick={() => setModalActive(true)}
                  className={'text-brown5'}
               />
            </div>
         </div>
         <div
            className={`transition-all duration-300 overflow-hidden ${
               props.isExpanded ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            }`}
         >
         </div>
         <ModalCreateCategory
            active={modalActive}
            onClose={() => {
               setModalActive(false);
               props.onCategoryAdded();
            }}
            parentId={props.id}
         />
      </>
   );
};