const unitsReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_UNITS':
        return action.payload;
      case 'UNSET_UNITS':
        return {};
      default:
        return state;
    }
  };
  
  // user will be on the redux state at:
  // state.user
  export default unitsReducer;