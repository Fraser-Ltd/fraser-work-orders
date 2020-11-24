import React, { Component } from 'react';
import { connect } from 'react-redux';


class NewUserForm extends Component {

    state = {
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        username: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
        console.log('in handleChange');
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

    render() {
        return (
            <>
                <div>
                    <h2>Add New User:</h2>
                </div>
                <div>
                    <form onSubmit={this.handleSubmit}>
                    <input name='firstName' type='text' value={this.state.firstName} onChange={this.handleChange} placeholder='First Name' />
                    <input name='lastName' type='text' value={this.state.lastName} onChange={this.handleChange} placeholder='Last Name' />
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
