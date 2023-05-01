import React, { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import RequireAuth from './protectedRoutes/RequireAuth';

const Login = lazy(() => import('./pages/login'));

function App() {

  const darkMode = useSelector((state) => state.darkMode.darkMode);






  //const [dark, setDark] = useState(false);
  
  const darkTheme = useMemo(
   () =>
     createTheme({
       palette: {
         mode: darkMode ? 'dark' : 'light',
       },
     }),
   [darkMode]
 );

  return (
    
    <Suspense>
        <ThemeProvider theme={darkTheme}>

      <CrmAppbar  dark={darkMode} />
      <UserProvider>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
              element={<RequireAuth allowedRoles={['admin', 'sav']} />}
            >
        <Route path="/sav" element={<Sav />} />
        </Route>
        <Route
              element={<RequireAuth allowedRoles={['admin', 'quality']} />}
            >
        <Route path="/quality" element={<Quality />} />
        </Route>
        <Route
              element={<RequireAuth allowedRoles={['admin', 'wc']} />}
            >
        <Route path="/welcome-call" element={<WelcomeCall />} />
        </Route>
        <Route element={<RequireAuth allowedRoles={['admin']} />}>
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/contract-create" element={<ContractCreate />} />
        <Route path="/admin/users" element={<Users />} />
        </Route>
        <Route
              element={
                <RequireAuth
                  allowedRoles={['admin', 'quality', 'wc', 'sav', 'backOffice']}
                />
              }
            >
        <Route path='contract-details/:slug/:energie' element={<ContractDetails/>} />
        </Route>
      </Routes>
      </UserProvider>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
