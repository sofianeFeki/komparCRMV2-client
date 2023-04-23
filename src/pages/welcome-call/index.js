import React from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from '../../components/dataGrid';
import { MainContainer } from '../../style/mainContainer';
import { adminColumns } from '../../components/dataGrid/columns';

const rows = [];

const WelcomeCall = () => {
  const { drawer } = useSelector((state) => ({ ...state }));
  return (
    <MainContainer open={drawer}>
      <DataTable rows={rows} columns={adminColumns} />
    </MainContainer>
  );
};

export default WelcomeCall;
