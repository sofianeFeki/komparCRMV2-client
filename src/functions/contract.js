import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API;

export const createContract = async (contract, authtoken) =>
  await axios.post(`${API_BASE_URL}/contract`, contract, {
    headers: {
      authtoken,
    },
  });

  export const getContract = async (clientRef, energie) =>
  await axios.get(`${API_BASE_URL}/contract/${clientRef}/${energie}`);

  export const getAdminRows = async (paginationModel, sortOptions) =>
  await axios.post(`${API_BASE_URL}/admin-contracts/`,  {
    paginationModel,
    sortOptions,
  });

  export const getQtéRows = async (paginationModel, sortOptions) =>
  await axios.post(`${API_BASE_URL}/qty-contracts/`,  {
    paginationModel,
    sortOptions,
  });


  export const getFilters = async (serverFilters) =>
  await axios.post(`${API_BASE_URL}/Filters/`,  {
    serverFilters
  });

  export const getReservation = async (id, user) =>
  await axios.post(`${API_BASE_URL}/${id}/reserve`,  {
    user
  });