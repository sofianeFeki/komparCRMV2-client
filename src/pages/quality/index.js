import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { DataTable } from '../../components/dataGrid';
import { MainContainer } from '../../style/mainContainer';
import {  GridActionsCellItem } from '@mui/x-data-grid';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import { Link, useNavigate } from 'react-router-dom';
import { getQtéRows, getReservation } from '../../functions/contract';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { toast } from 'react-toastify';



const Quality = () => {


  const { drawer, user } = useSelector((state) => ({ ...state }));

  const [rows, setRows] = useState([]);
 
  const history = useNavigate()

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 20,
  });

  const [sortOptions, setSortOptions] = useState([ { field: 'date_de_la_signature', sort: 'desc' } ]);
  const [loading, setLoading] = useState(false);
  const [totalRowCount, setTotalRowCount] = useState(0);

  


const loadContract = () => {
  getQtéRows(paginationModel,sortOptions).then((c) => {
    const { data, total } = c.data;
    setRows(data);
    setTotalRowCount(total);
     });

};

useEffect(() => {
  loadContract();
  console.log(rows)
}, [paginationModel, sortOptions , user]);

  const qualityCulumns = useMemo(() => [
    {
      field: 'clientRef',
      headerName: 'Ref client',
      flex : 0.4
    },
    {
      field: 'date_de_la_signature',
      headerName: 'Date de signature',
      flex : 0.4

    },
    {
      field: 'Contact',
      headerName: 'Contact',
      flex : 0.4,
      valueGetter: (params) =>
        `${params.row.Civility || ''} ${params.row.Prénom || ''} ${params.row.Nom || ''}`,
    },
    {
      field: 'Fournisseur',
      headerName: 'Fournisseur',
      flex : 0.3
    },
    {
      field: 'energie',
      headerName: 'Energie',
      flex : 0.3
    },
    {
      field: 'Nom_du_partenaire',
      headerName: 'Partenaire',
      flex : 0.4
    },
  
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      flex : 0.2,
      getActions: (params) => [
        
        <GridActionsCellItem
        icon={params.row.reservedBy ? <VisibilityOffIcon /> : <VisibilityIcon />}
        label="open"
        component={Link}
        to={`/contract-details/${params.row.clientRef}/${params.row.energie}`}
        disabled={params.row.reservedBy !== null }
      />,
       
        <GridActionsCellItem
          icon={<TouchAppIcon />}
          label="Reserver"
          onClick={() => handleReserve(params.row)}
          showInMenu
          disabled={params.row.reservedBy !== null}

        />
      ],
    },
  ], []);

  // const handleReserve = async (_id) => {
  //   try {
  //     const result = await toast.promise(
  //       getReservation(_id, user._id),
  //       {
  //         loading: 'Reserving Contract...',
  //         success: (response) => {
  //           return response.message;
  //         },
  //         error: (error) => {
  //           if (error.response && error.response.status === 403) {
  //             return 'Contract already reserved';
  //           } else {
  //             return `Error: ${error.message}`;
  //           }
  //         },
  //       }
  //     );
  
  //     console.log(result);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  const handleReserve = async (row) => {
    try {
      const response = await toast
      .promise(getReservation(row._id, user._id),
        {
          pending: 'Reserving Contract...',
          success: {
            render() {
              history(`/contract-details/${row.clientRef}/${row.energie}`);
              return 'Contract reserved Successfully';
            },
          },
          error:  {
            render() {
           
           return 'Contract already reserved';
                          
            },
            // other options         
          },
        }
      );
    } catch (error) {
      console.error(error);
    }

  };

  // const handleReserve = async (_id) => {
  //   if (!_id) {
  //     return;
  //   }
  
  //   try {
  //     const { data, status } = await getReservation(_id, user._id);
      
  //     toast.promise(
  //       Promise.resolve({
  //         data,
  //         status,
  //       }),
  //       {
  //         loading: 'Reserving Contract...',
  //         success: (result) => `Contract reserved successfully`,
  //         error: (result) => {
  //           if (result.status === 403) {
  //             return 'Contract already reserved';
  //           } else {
  //             return `Error: ${result.data.error}`;
  //           }
  //         },
  //       }
  //     );
      
  //   } catch (err) {
  //     console.error(err); // Handle error
  //   }
  // };

 




  return (
    <MainContainer open={drawer}>
      <DataTable rows={rows} columns={qualityCulumns} paginationModel={paginationModel} 
      setPaginationModel={setPaginationModel} sortOptions={sortOptions} setSortOptions={setSortOptions}
      loading={loading} setLoadng={setLoading} 
      totalRowCount={totalRowCount} setToatalRowCont={setTotalRowCount} page={paginationModel.page} />
    </MainContainer>
  );
};

export default Quality;
