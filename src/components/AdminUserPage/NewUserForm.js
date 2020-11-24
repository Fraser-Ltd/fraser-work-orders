import React, { Component } from 'react';
import { connect } from 'react-redux';


class NewUserForm extends Component {

    state = {
        first_name: '',
        last_name: '',
        email: '',
        role: '',
        username: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log('in handleChange', event.target.value);
    }

    handleSubmit = (event) => {
        console.log('form submitted')
        this.props.dispatch({
            type: "UPDATE_USER",
            payload: this.state
        })
        this.setState({
            first_name: '',
            last_name: '',
            email: '',
            role: '',
            username: '',
            password: ''
        });
        console.log('set state')
    }

    render() {
        return (
            <>
                <div>
                    <p>Add New User:</p>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                    <input name='first_name' type='text' value={this.state.first_name} onChange={this.handleChange} placeholder='First Name' />
                    <input name='last_name' type='text' value={this.state.last_name} onChange={this.handleChange} placeholder='Last Name' />
                    <input name='email' type='text' value={this.state.email} onChange={this.handleChange} placeholder='E-mail' />
                    <input name='role' type='text' value={this.state.role} onChange={this.handleChange} placeholder='Role' />
                    <input name='username' type='text' value={this.state.username} onChange={this.handleChange} placeholder='Username' />
                    <input name='password' type='text' value={this.state.password} onChange={this.handleChange} placeholder='Password' />
                    <button type="submit">Add New User</button>
                </form>
                </div>
            </>)
    };
}

export default connect()(NewUserForm);
