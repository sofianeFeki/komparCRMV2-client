import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from '../../components/dataGrid';
import { MainContainer } from '../../style/mainContainer';
import { wcCulumns } from '../../components/dataGrid/columns';
import { getWcRows } from '../../functions/contract';

const rows = [];

const WelcomeCall = () => {

  const { drawer, quickFilter } = useSelector((state) => ({ ...state }));

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false);


  const loadContract = () => {
    setLoading(true)
    getWcRows(quickFilter.text).then((c) => {
      setRows(c.data);
      console.log(c.data)
      setLoading(false)

       });
  };


  
  useEffect(() => {
    loadContract();
    console.log(quickFilter.text)
   
  }, [quickFilter]);

  return (
    <MainContainer open={drawer}>
      <DataTable rows={rows} columns={wcCulumns}  loading={loading} setLoadng={setLoading} 
 />
    </MainContainer>
  );
};

export default WelcomeCall;
