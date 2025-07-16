import { createContext, FC, ReactNode, useContext, useState } from "react";

export type NotificationType = 'error' | 'success' | 'warning';

interface Notification {
   id: number;
   message: string;
   type: NotificationType;
}

interface NotificationsContextType {
   notifications: Notification[];
   showNotification: (msg: string, type: NotificationType) => void;
   closeNotification: (id: number) => void;
}

export const NotificationsContext = createContext<NotificationsContextType | null>(null);

export const NotificationsProvider: FC<{children: ReactNode}> = ({children}) => {
   const [notifications, setNotifications] = useState<Notification[]>([]);

   const showNotification = (msg: string, type: NotificationType) => {
      const id = Date.now();
      setNotifications([...notifications, { id, message: msg, type }]);
      setTimeout(() => {
         setNotifications(notifications => notifications.filter(notification => notification.id !== id));
      }, 5000);
   };

   const closeNotification = (id: number) => {
      setNotifications(notifications => notifications.filter(notification => notification.id !== id));
   };

   return (
      <NotificationsContext.Provider value={{ notifications, showNotification, closeNotification }}>
         {children}
      </NotificationsContext.Provider>
   );
};

export const useNotifications = () => {
   const context = useContext(NotificationsContext);
   if (!context) {
      throw new Error('useNotifications must be used within a NotificationsProvider');
   }
   return context;
};