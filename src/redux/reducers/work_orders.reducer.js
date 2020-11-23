const workOrders = (state = {}, action) => {
    switch (action.type) {
      case 'SET_WORKORDERS':
        return action.payload;
      default:
        return state
    }
  };
// user will be on the redux state at:
// state.workOrders
  export default workOrders;