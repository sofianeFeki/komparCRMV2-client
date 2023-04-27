export const filtersReducer = (state = { serverData: null }, action) => {
  switch (action.type) {
    case 'SET_FILTERS':
      return { ...state, ...action.payload };
    case 'SET_SERVER_DATA':
      return { ...state, serverData: action.payload };
    case 'RESET_FILTERS':
      return { serverData: null };
    default:
      return state;
  }
};
