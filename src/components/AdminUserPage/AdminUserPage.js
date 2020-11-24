import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AdminUserPage extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_ALLUSERS'
        })
    }
    onSubmit = (event) => {
        event.preventDefault();

        // simple dispatch for the saga to take care of
        this.props.dispatch({
            type: 'ADD_NEWUSER',
            payload: this.state
        });
    }

    render() {//need to set up the tables the user admin would see
        return (
            <div>
                <h1 id="welcome">Welcome to the Admin User Page!</h1>
                <p>Your ID is: {this.props.store.user.id}</p>
                <AdminUserPageTable/>
                <form> "Add a New User:" 
                    <tr heading="Add a New User:">
                        <td input="First Name">First Name</td>
                        <td input="Last Name">Last Name</td>
                        <td input="E-mail">E-mail</td>
                        <td input="Role">Role</td>
                        <td input="User Name">User Name</td>
                        <td input="Password">Password</td>
                        <button>Add</button>
                    </tr>
                </form>
            </div>
           
        );
    }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(AdminUserPage);
