import React, { Component } from 'react';
import { connect } from 'react-redux';

//material-ui imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { FormControl, MenuItem, withStyles } from '@material-ui/core';
import swal from 'sweetalert';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
    root: {
        marginTop: 25,
        Maxheight: 400,
        marginBottom: 40,
    },
    heading: {
        padding: 15,
        marginTop: 60,
    },
    tableHeading: {
        textAlign: 'center',
    },
    row: {
        '&:hover': { cursor: 'pointer' }
    },
    newUser: {
        margin: 20,
        backgroundColor: 'green',
        '&:hover': { backgroundColor: 'green', color: 'white' }
    },
    cells: {
        textAlign: 'right',
    },
});


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
        if (this.props.user.id !== this.state.id) {
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
        });
        swal("Oops! That didn't work. The username might already be taken. Try again!",
            { timer: 3500, buttons: false, icon: 'error' });
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
    updatePassword = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: "UPDATE_PASSWORD",
            payload: { ...this.state, id: this.props.user.id }
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
                <Grid container justify='center'>
                    <Grid item xs={11} style={{ textAlign: 'center' }}>
                        <Typography variant='h3' >{this.props.edit ? 'Edit User:' : 'Add New User:'}</Typography>
                        <FormControl onSubmit={this.props.edit ? this.saveChanges : this.handleSubmit}>
                            <TextField
                                onChange={this.handleChange}
                                id="outlined"
                                label="FirstName"
                                value={this.state.firstName}
                                variant="outlined"
                                name='firstName'
                            />
                            <TextField
                                onChange={this.handleChange}
                                id="outlined"
                                label="LastName"
                                value={this.state.lastName}
                                variant="outlined"
                                name='lastName'
                            />
                            <TextField
                                onChange={this.handleChange}
                                id="outlined"
                                label="Email"
                                value={this.state.email}
                                variant="outlined"
                                name='email'
                            />
                            {/* <InputLabel >Role</InputLabel> */}
                            <Select fullwidth name='role' value={this.state.role} onChange={this.handleChange}>
                                <MenuItem value="">Role</MenuItem>
                                <MenuItem value={1}>Admin</MenuItem>
                                <MenuItem value={2} >Maintenance</MenuItem>
                                <MenuItem value={3}>Resident Coordinator</MenuItem>
                            </Select>
                            {this.props.edit && <Select onChange={this.handleChange} name="archiveEmployee" value={this.state.archiveEmployee}>
                                <MenuItem value={false}>Active</MenuItem>
                                <MenuItem value={true}>Removed</MenuItem>
                            </Select>}
                            <TextField
                                onChange={this.handleChange}
                                id="outlined"
                                label="Username"
                                value={this.state.username}
                                variant="outlined"
                                name='username'
                            />
                            {!this.props.edit &&
                                <>
                                    <TextField onChange={this.handleChange}
                                        id="outlined"
                                        label="Password"
                                        value={this.state.password}
                                        variant="outlined"
                                        name='password'
                                    />
                                    <Button type="submit" color="primary" variant="contained">Add New User</Button></>}
                            {this.props.edit &&
                                <Button type="submit" color="primary" variant="contained">Save Changes</Button>}
                        </FormControl>
                    </Grid>
                </Grid>

                {this.props.edit &&
                    <FormControl>
                        <TextField onChange={this.handleChange}
                            id="outlined"
                            label="Password"
                            value={this.state.password}
                            variant="outlined"
                            name='password'
                        />
                        <Button type="submit" color="primary" variant="contained" onClick={this.updatePassword}> Update Password</Button>
                    </FormControl>}
            </>)
    };
}

export default connect()(withStyles(styles, { withTheme: true })(NewUserForm));
