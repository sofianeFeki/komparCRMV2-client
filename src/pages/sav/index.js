import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from '../../components/dataGrid';
import { MainContainer } from '../../style/mainContainer';
import { adminColumns, savCulumns } from '../../components/dataGrid/columns';
import { getSavRows } from '../../functions/contract';


const Sav = () => {
  const { drawer, quickFilter } = useSelector((state) => ({ ...state }));

  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false);


  const loadContract = () => {
    setLoading(true)
    getSavRows(quickFilter.text).then((c) => {
      setRows(c.data);
      console.log(c.data)
      setLoading(false)
       });
  
  };


  
  useEffect(() => {
    loadContract();
   
  }, [quickFilter]);

  return (
    <MainContainer open={drawer}>
      <DataTable rows={rows} columns={savCulumns} loading={loading} setLoadng={setLoading} />
    </MainContainer>
  );
};

export default Sav;
