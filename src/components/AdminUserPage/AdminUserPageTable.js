import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class AdminUserPageTable extends Component {

    onClick ()

    
    render() {
        const user = this.props.user.id;

        return (
            <>
            <table>
                <thead>
                    <tr heading= "Current Users:">
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>E-mail</td>
                        <td>Role</td>
                        <td>User Name</td>
                        <button>Edit</button>
                    </tr>
                    <hr></hr>

                        <tr heading="Add a New User:">
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>E-mail</td>
                        <td>Role</td>
                        <td>User Name</td>
                        <td>Password</td>
                        <button>Add</button>
                    </tr>
                </thead>
                <tbody>
                    {this.props.user [0] && this.props.user.map((userList) => <adminUserPage userList = {userList} key={userList.id}/>)}
                </tbody>
            </table>
            </>
        )
    }
}

export default connect(mapStoreToProps)(AdminUserPageTable);