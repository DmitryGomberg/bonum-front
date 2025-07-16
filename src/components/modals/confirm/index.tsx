import {FC} from 'react'
import {UiModal} from "../../../ui/modal";
import {UiButton} from "../../../ui/button";

type IModalConfirmProps = {
   active: boolean;
   title: string;
   onClose(): void;
   onUpdate?: () => void;
   onConfirm(): void;
}

export const ModalConfirm: FC<IModalConfirmProps> = (props) => {
  return (
    <UiModal active={props.active} onClose={props.onClose} title={props.title} className={'flex-row gap-[20px] p-6 px-10'}>
      <UiButton label={'Подтвердить'} onClick={() => { props.onConfirm(); props.onUpdate?.(); }} className={'w-full bg-white! hover:bg-brown1! text-brown5! border border-brown4 '} />
      <UiButton label={'Отменить'} onClick={props.onClose} />
    </UiModal>
  )
}