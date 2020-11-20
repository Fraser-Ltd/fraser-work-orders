const propertiesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_PROPERTY':
      return action.payload;
    case 'UNSET_PROPERTY':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default propertiesReducer;
