import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import {
  DataGrid,
  gridClasses,
  gridPageCountSelector,
  gridPageSelector,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarQuickFilter,
  useGridApiContext,
  useGridSelector,
  frFR,
  gridRowCountSelector,
} from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import {  Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import Filters from './filters';
import Export from './export';
import { CustomNoRowsOverlay } from '../../style/dataGrid';
import { darken, lighten, styled } from '@mui/material/styles';

const getBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.7) : lighten(color, 0.7);

const getHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.6) : lighten(color, 0.6);

const getSelectedBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.5) : lighten(color, 0.5);

const getSelectedHoverBackgroundColor = (color, mode) =>
  mode === 'dark' ? darken(color, 0.4) : lighten(color, 0.4);


const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
 
  '& .super-app-theme--annulation': {
    backgroundColor: getBackgroundColor(
      theme.palette.error.main,
      theme.palette.mode,
    ),
    '&:hover': {
      backgroundColor: getHoverBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode,
      ),
    },
    '&.Mui-selected': {
      backgroundColor: getSelectedBackgroundColor(
        theme.palette.error.main,
        theme.palette.mode,
      ),
      '&:hover': {
        backgroundColor: getSelectedHoverBackgroundColor(
          theme.palette.error.main,
          theme.palette.mode,
        ),
      },
    },
  },
}));




const theme = createTheme(frFR);

 function CustomFooter() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
    const totalRowCount = useGridSelector(apiRef, gridRowCountSelector);
  
    return (
      <Box sx={{ p: 1, display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="subtitle2" sx={{ pt: 1 }}>
          <strong>{totalRowCount} </strong> résultats
        </Typography>
        <Pagination
          color="primary"
          variant="outlined"
          shape="rounded"
          page={page + 1}
          count={pageCount}
          renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
          onChange={(event, value) => apiRef.current.setPage(value - 1)}
        />
      </Box>
    );
  }



function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
      <Filters />
      <Export />
      <GridToolbarQuickFilter sx={{ marginLeft: 'auto', paddingRight: 1 }} />
    </GridToolbarContainer>
  );
}

export const DataTable = ({ rows ,columns, paginationModel,setPaginationModel, sortOptions, setSortOptions,loading, totalRowCount }) => {


 


  useEffect(() => {
  })

  const getRowSpacing = useCallback((params) => {
    return {
      top: params.isFirstVisible ? 0 : 5,
      bottom: params.isLastVisible ? 0 : 5,
    };
  }, []);

  const dispatch = useDispatch();

  const onFilterChange = useCallback(
    (filterModel) => {
      // Here you save the data you need from the filter model
      const value = filterModel.quickFilterValues;
      dispatch({
        type: 'SEARCH_QUERY',
        payload: { text: value },
      });
    },
    [dispatch]
  );

  const handleSortModelChange = useCallback((sortModel) => {
    // Here you save the data you need from the sort model
    setSortOptions({ sortModel: [...sortModel] });
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ m: 2, fontWeight: 700 }}>
        Listes des contrats clients
      </Typography>
      <Box
        sx={{
          height: 'calc(100vh - 150px)',
          width: '100%',
        }}
      >
        <ThemeProvider theme={theme}>
          <StyledDataGrid
            rows={rows}
            columns={columns}
            onFilterModelChange={onFilterChange}
            paginationModel={paginationModel}
            loading={loading}
            paginationMode="server"
            onPaginationModelChange={setPaginationModel}
            onSortModelChange={handleSortModelChange}
            rowCount={totalRowCount}
            getRowClassName={(params) => `super-app-theme--${params.row.StatutQté}`}

            slots={{
              toolbar: CustomToolbar,
              noRowsOverlay: CustomNoRowsOverlay,
            }}
            getRowSpacing={getRowSpacing}
            disableRowSelectionOnClick
            getRowId={(row) => row.contratRef}
            sx={{
              m: 2,
              boxShadow: 3,
              border: 2,
              borderColor: grey[200],

              
              [`& .${gridClasses['columnHeader']}`]: {
                fontSize: 15
              }
            }}

            initialState={{
              ...rows.initialState,
              sorting: {
                ...rows.initialState?.sorting,
                sortModel: [
                  {
                    field: 'date_de_la_signature',
                    sort: 'desc',
                  },
                ],
              },
            }}
          />
        </ThemeProvider>
      </Box>
    </Box>
  );
};
