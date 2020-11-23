const allUsers = (state = {}, action) => {
    switch (action.type) {
<<<<<<< HEAD
      case 'SET_USERS':
            return action.payload;
        default:
            return state;
=======

      default:
        return state

>>>>>>> 615ec2c738010488d69463296da31daf3abd7688
    }
  };

  export default allUsers;