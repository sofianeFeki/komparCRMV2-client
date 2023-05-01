import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { MainContainer } from '../../style/mainContainer';

import { usersColumns } from '../../components/dataGrid/columns';
import { DataTable } from '../../components/dataGrid';
import { getUsers } from '../../functions/user';
import { grey } from '@mui/material/colors';


const Users = () => {
  const { drawer } = useSelector((state) => ({ ...state }));
  const darkMode = useSelector((state) => state.darkMode.darkMode);


  const [rows , setRows] = useState([])

const loadUsers = () => {
  getUsers().then((c) => {  
    setRows(c.data);
     });

};

useEffect(() => {
  loadUsers();
}, []);


  return (
    <MainContainer open={drawer} sx={{backgroundColor : darkMode ? "auto"  : grey[100] }}>
      <DataTable rows={rows} columns={usersColumns}  />
    </MainContainer>
  );
};

export default Users;
