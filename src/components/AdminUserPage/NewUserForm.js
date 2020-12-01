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
    input: {
        marginTop: 2,
        marginBottom: 2
    }
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
        const { classes } = this.props;
        this.propsChange();
        console.log('newuserform props', this.props)
        return (
            <>
                <Grid container justify='center'>
                    <Grid item xs={11} style={{ textAlign: 'center' }}>
                        <Typography variant='h3' >{this.props.edit ? 'Edit User:' : 'Add New User:'}</Typography>
                        <form onSubmit={this.props.edit ? this.saveChanges : this.handleSubmit}>
                            <Grid container justify='center'>
                                <Grid item xs={12}>
                                    <TextField className={classes.input}
                                        onChange={this.handleChange}
                                        id="outlined"
                                        label="FirstName"
                                        value={this.state.firstName}
                                        variant="outlined"
                                        name='firstName'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField className={classes.input}
                                        onChange={this.handleChange}
                                        id="outlined"
                                        label="LastName"
                                        value={this.state.lastName}
                                        variant="outlined"
                                        name='lastName'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField className={classes.input}
                                        onChange={this.handleChange}
                                        id="outlined"
                                        label="Email"
                                        value={this.state.email}
                                        variant="outlined"
                                        name='email'
                                    />
                                </Grid>
                                <Grid item xs={12}  >
                                    <Grid container justify='center'>
                                        <Grid item xs={2}>
                                            <FormControl fullWidth className={classes.input}>
                                                <InputLabel >Role</InputLabel>
                                                <Select fullWidth name='role' variant="outlined" value={this.state.role} onChange={this.handleChange}>
                                                    <MenuItem value={1}>Admin</MenuItem>
                                                    <MenuItem value={2} >Maintenance</MenuItem>
                                                    <MenuItem value={3}>Resident Coordinator</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}  >
                                    <Grid container justify='center'>
                                        <Grid item xs={2}>
                                            <FormControl fullWidth className={classes.input}>
                                                <InputLabel >Employee Status</InputLabel>
                                                {this.props.edit && <Select fullWidth variant="outlined" onChange={this.handleChange} name="employeeStatus" value={this.state.archiveEmployee}>
                                                    <MenuItem value={false}>Active</MenuItem>
                                                    <MenuItem value={true}>Removed</MenuItem>
                                                </Select>}
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}  >
                                    <Grid container justify='center'>
                                        <Grid item xs={2}>
                                            <TextField className={classes.input}
                                                onChange={this.handleChange}
                                                id="outlined"
                                                label="Username"
                                                value={this.state.username}
                                                variant="outlined"
                                                name='username'
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}  >
                                    <Grid container justify='center'>
                                        <Grid item xs={2}>
                                            {!this.props.edit &&
                                                <>
                                                    <TextField className={classes.input} onChange={this.handleChange}
                                                        id="outlined"
                                                        label="Password"
                                                        value={this.state.password}
                                                        variant="outlined"
                                                        name='password'
                                                    />
                                                    <Button type="submit" color="primary" variant="contained">Add New User</Button></>}
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <form>
                                    <Grid item style={{ textAlign: 'center', marginBottom: 15 }}>
                                        {this.props.edit &&
                                            <Button type="submit" color="primary" variant="contained">Save Changes</Button>}
                                    </Grid>
                                </form>
                            </Grid>
                        </form>
                    </Grid>
                </Grid>

                {this.props.edit &&
                    <form>
                        <Grid item xs={12}  >
                            <Grid container justify='center'>
                                <Grid item xs={2}>
                                    <TextField onChange={this.handleChange}
                                        id="outlined"
                                        label="Password"
                                        value={this.state.password}
                                        variant="outlined"
                                        name='password'
                                    />
                                    <Button type="submit" color="primary" variant="contained" onClick={this.updatePassword}> Update Password</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>}
            </>)
    };
}

export default connect()(withStyles(styles, { withTheme: true })(NewUserForm));
