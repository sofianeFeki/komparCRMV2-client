import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import CrmAppbar from './components/appbar';
import Admin from './pages/admin';
import ContractCreate from './pages/admin/contractCreate';
import Quality from './pages/quality';
import Sav from './pages/sav';
import Users from './pages/admin/users';
import WelcomeCall from './pages/welcome-call';
import ContractDetails from './pages/admin/contractDetails';
import UserProvider from './context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '@mui/material';


const Login = lazy(() => import('./pages/login'));

function App() {

  return (
    <UserProvider>

    <Suspense>
      <CrmAppbar />
      
        <Button component={Link} to={"/login"}>
login
        </Button>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/sav" element={<Sav />} />
        <Route path="/quality" element={<Quality />} />
        <Route path="/welcome-call" element={<WelcomeCall />} />
        <Route path="/admin/contract-create" element={<ContractCreate />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path='contract-details/:slug/:energie' element={<ContractDetails/>} />
      </Routes>
    </Suspense>
    </UserProvider>
  );
}

export default App;
