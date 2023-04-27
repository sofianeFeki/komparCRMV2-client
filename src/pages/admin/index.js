import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from '../../components/dataGrid';
import { MainContainer } from '../../style/mainContainer';
import { adminColumns } from '../../components/dataGrid/columns';
import { getAdminRows, getFilters } from '../../functions/contract';
import DraggableDialog from '../../components/dialog';



const Admin = () => {
  const { drawer, quickFilter   } = useSelector((state) => ({ ...state }));
  const serverData = useSelector(state => state.filters.serverData);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRowCount, setTotalRowCount] = useState(0);


  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const [sortOptions, setSortOptions] = useState([ { field: 'date_de_la_signature', sort: 'desc' } ]);
 
  const loadContract = () => {
    setLoading(true);
  
    if (serverData && serverData.data !== null) { // check if filters exist and are not empty
  
        const { data, total } = serverData;
        setRows(data);
        setTotalRowCount(total);
        setLoading(false);
    
     
    } else {
      getAdminRows(paginationModel, sortOptions, quickFilter).then((response) => {
        const { data, total } = response.data;
        setRows(data);
        setTotalRowCount(total);
        setLoading(false);
      });
    }
  };
  
  



  useEffect(() => {
    loadContract();
    console.log('--------> redux data',quickFilter );
  }, [serverData, paginationModel, sortOptions, quickFilter ]);

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
