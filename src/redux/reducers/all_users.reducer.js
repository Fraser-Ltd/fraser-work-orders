const allUsers = (state = {}, action) => {
    switch (action.type) {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> bd870c67ed825f5247c42c963999538ce6065769
      case 'SET_USERS':
            return action.payload;
        default:
            return state;
<<<<<<< HEAD
=======

      default:
        return state

>>>>>>> 615ec2c738010488d69463296da31daf3abd7688
=======

>>>>>>> bd870c67ed825f5247c42c963999538ce6065769
    }
  };

  export default allUsers;