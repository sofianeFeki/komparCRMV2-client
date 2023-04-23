import axios from 'axios';

const API_BASE_URL = "https://komparcrm-server.onrender.com";

export const createOrUpdateUser = async (authtoken) => {
  return await axios.post(
    `${API_BASE_URL}/create-or-update-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};

export const currentUser = async (authtoken) => {
  return await axios.post(
    `${API_BASE_URL}/current-user`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};
