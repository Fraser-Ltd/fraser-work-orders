const reportsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_REPORT':
        return action.payload;
      case 'UNSET_REPORT':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.reports
  export default reportsReducer;