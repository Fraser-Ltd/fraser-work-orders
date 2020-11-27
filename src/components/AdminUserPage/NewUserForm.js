import React, { Component } from 'react';
import { connect } from 'react-redux';


class NewUserForm extends Component {

    state = {
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        email: this.props.user.email,
        role: this.props.user.role,
        username: this.props.user.username,
        password: '',
        archiveEmployee: this.props.user.archiveEmployee,
        id: this.props.user.id
        
    }
    saveChanges = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'UPDATE_USER_ADMIN',
            payload: this.state
        });
        this.props.clearEditUser();
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log('in handleChange');
    }

    propsChange = () => {
        if(this.props.user.id !== this.state.id){
            this.setState({
                firstName: this.props.user.firstName,
                lastName: this.props.user.lastName,
                email: this.props.user.email,
                role: this.props.user.role,
                username: this.props.user.username,
                password: '',
                archiveEmployee: this.props.user.archiveEmployee,
                id: this.props.user.id
            });
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('form submitted')
        this.props.dispatch({
            type: "REGISTER",
            payload: this.state
        })
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            username: '',
            password: ''
        });
        console.log('set state')
    }
    updatePassword = (event)=>{
        event.preventDefault();
        this.props.dispatch({
            type: "UPDATE_PASSWORD",
            payload: {...this.state, id: this.props.user.id}
        })
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            username: '',
            password: ''
        })
    }
    render() {
        this.propsChange();
        console.log('newuserform props', this.props)
        return (
            <>
                <div>
                    <h2>{this.props.edit ? 'Edit User:' : 'Add New User:'}</h2>
                </div>
                <div>
                    <form onSubmit={this.props.edit? this.saveChanges : this.handleSubmit}>
                    <input required name='firstName' type='text' value={this.state.firstName} onChange={this.handleChange} placeholder='First Name' />
                    <input required name='lastName' type='text' value={this.state.lastName} onChange={this.handleChange} placeholder='Last Name' />
                    <input required name='email' type='text' value={this.state.email} onChange={this.handleChange} placeholder='E-mail' />
                        <select required value={this.state.role} onChange={this.handleChange} id="cars" name="role">
                            <option value="" >Role</option>
                            <option value={1}>Admin</option>
                            <option value={2} >Maintenance</option>
                            <option value={3}>Resident Coordinator</option>
                        </select>
                        {this.props.edit && <select onChange={this.handleChange} name="archiveEmployee" value={this.state.archiveEmployee}>
                            <option value={false}>Active</option>
                            <option value={true}>Removed</option>
                        </select>}

                            <input required name='username' type='text' value={this.state.username} onChange={this.handleChange} placeholder='Username' />
                            {!this.props.edit && <><input required name='password' type='text' value={this.state.password} onChange={this.handleChange} placeholder='Password' />
                            <button type="submit">Add New User</button></>}
                        
                    {this.props.edit && <button type="submit">Save Changes</button>}
                </form>
                </div>
                
                {this.props.edit && 
                <form>
                    <input name='password' type='text' value={this.state.password} onChange={this.handleChange} placeholder='Password'/>
                    <button onClick={this.updatePassword} type="submit"> Update Password</button></form>}
            </>)
    };
}

export default connect()(NewUserForm);
