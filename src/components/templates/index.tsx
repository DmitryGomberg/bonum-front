import {FC, ReactNode, useState} from 'react';
import {Sidebar} from "../sidebar";
import {Header} from "../header";

type IAppTemplateProps = {
   children: ReactNode;
};

export const AppTemplate: FC<IAppTemplateProps> = (props) => {
   const [isSidebarOpen, setSidebarOpen] = useState(false);

   const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
   const closeSidebar = () => setSidebarOpen(false);

   return (
      <div className={'flex w-full min-h-screen'}>
         <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
         <div className={'w-full flex flex-col max-h-screen overflow-auto'}>
            <Header onToggleSidebar={toggleSidebar} />
            <div className={'px-4 py-4 bg-brown1 grow-1'}>
               <div className={'max-w-[1280px] mx-auto'}>{props.children}</div>
            </div>
         </div>
      </div>
   );
};