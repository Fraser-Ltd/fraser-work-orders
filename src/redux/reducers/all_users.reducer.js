const allUsers = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.payload;
    default:
      return state;
    case 'SET_PASSWORD':
      return state;
    case 'SET_USER_UPDATE':
      return state;
    case 'SET_ADMIN_UPDATE':
      return state;
  }
};

export default allUsers;