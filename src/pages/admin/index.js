import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from '../../components/dataGrid';
import { MainContainer } from '../../style/mainContainer';
import { adminColumns } from '../../components/dataGrid/columns';
import { getAdminRows } from '../../functions/contract';



const Admin = () => {
  const { drawer } = useSelector((state) => ({ ...state }));
  const [rows, setRows] = useState([]);



  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const [sortOptions, setSortOptions] = useState([ { field: 'date_de_la_signature', sort: 'desc' } ]);
  const [loading, setLoading] = useState(false);
  const [totalRowCount, setTotalRowCount] = useState(0);

  


const loadContract = () => {
  getAdminRows(paginationModel,sortOptions).then((c) => {
    const { data, total } = c.data;
    setRows(data);
    setTotalRowCount(total);
     });

};

useEffect(() => {
  loadContract();
}, [paginationModel, sortOptions]);

  return (
    <MainContainer open={drawer}>
      <DataTable rows={rows} columns={adminColumns} paginationModel={paginationModel} 
      setPaginationModel={setPaginationModel} sortOptions={sortOptions} setSortOptions={setSortOptions}
      loading={loading} setLoadng={setLoading} 
      totalRowCount={totalRowCount} setToatalRowCont={setTotalRowCount} page={paginationModel.page}
         />
    </MainContainer>
  );
};

export default Admin;
