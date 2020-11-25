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
        id: this.props.user.id
        
    }
    saveChanges = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'UPDATE_USER_ADMIN',
            payload: {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                role: this.state.role,
                username: this.state.username,
                archiveEmployee: false,
                id: this.props.user.id
            }
        })
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
                    <h2>Add New User:</h2>
                </div>
                <div>
                    <form >
                    <input name='firstName' type='text' value={this.state.firstName} onChange={this.handleChange} placeholder='First Name' />
                    <input name='lastName' type='text' value={this.state.lastName} onChange={this.handleChange} placeholder='Last Name' />
                    <input name='email' type='text' value={this.state.email} onChange={this.handleChange} placeholder='E-mail' />
                        <select value={this.state.role} onChange={this.handleChange} id="cars" name="role">
                            <option value="" >Role</option>
                            <option value={1}>Admin</option>
                            <option value={2} >Maintenance</option>
                            <option value={3}>Resident Coordinator</option>
                        </select>            
                            <input name='username' type='text' value={this.state.username} onChange={this.handleChange} placeholder='Username' />
                            {!this.props.edit && <><input name='password' type='text' value={this.state.password} onChange={this.handleChange} placeholder='Password' />
                            <button onClick={this.handleSubmit} type="submit">Add New User</button></>}
                        
                    {this.props.edit && <button onClick={this.saveChanges}>Save Changes</button>}
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
