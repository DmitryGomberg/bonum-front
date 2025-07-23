import React, { ReactNode } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/registration';
import { HomePage } from './pages/home';
import {NotificationsProvider} from "./context/notifications.tsx";
import {Notification} from "./components/notification";
import {AuthProvider, useAuth } from './context/auth.tsx';
import {AppTemplate} from "./components/templates";
import {AddTransactionPage} from "./pages/addTransaction";
import {AccountsPage} from "./pages/accounts";
import {SettingsPage} from "./pages/settings";
import {UserProvider} from "./context/user.tsx";
import {TransactionsPage} from "./pages/transactions";
import {ErrorPage} from "./pages/404";
import {ForgotPasswordPage} from "./pages/forgotPassword";
import {ResetPasswordPage} from "./pages/resetPassword";

const ProtectedRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
   const { isAuthenticated } = useAuth();
   return isAuthenticated ? <AppTemplate>{children}</AppTemplate> : <Navigate to="/login" />;
};

const App: React.FC = () => {
   return (
      <AuthProvider>
         <NotificationsProvider>
            <UserProvider>
               <Router>
                  <Notification />
                  <Routes>
                     <Route path="/registration" element={<RegisterPage/>}/>
                     <Route path="/login" element={<LoginPage/>}/>
                     <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                     <Route path="/reset-password" element={<ResetPasswordPage />}/>
                     <Route path="/" element={<Navigate to="/login"/>}/>
                     <Route
                        path="/home"
                        element={
                           <ProtectedRoute>
                              <HomePage/>
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/createTransaction"
                        element={
                           <ProtectedRoute>
                              <AddTransactionPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/accounts"
                        element={
                           <ProtectedRoute>
                              <AccountsPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/settings"
                        element={
                           <ProtectedRoute>
                              <SettingsPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="/transactions"
                        element={
                           <ProtectedRoute>
                              <TransactionsPage />
                           </ProtectedRoute>
                        }
                     />
                     <Route
                        path="*"
                        element={
                           <ErrorPage />
                        }
                     />
                  </Routes>
               </Router>
            </UserProvider>
         </NotificationsProvider>
      </AuthProvider>
   );
};

export default App;