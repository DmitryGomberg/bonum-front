import { FC, ReactNode } from 'react'

type IPageContainerProps = {
   children: ReactNode;
}

export const PageContainer: FC<IPageContainerProps> = (props) => {
  return (
    <div>
       {props.children}
    </div>
  )
}