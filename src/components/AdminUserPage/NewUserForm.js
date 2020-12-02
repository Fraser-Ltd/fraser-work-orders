import React, { Component } from 'react';
import { connect } from 'react-redux';

//material-ui imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
//import TableBody from '@material-ui/core/TableBody';
//import TableCell from '@material-ui/core/TableCell';
//import TableContainer from '@material-ui/core/TableContainer';
//import TableHead from '@material-ui/core/TableHead';
//import TableRow from '@material-ui/core/TableRow';
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
        marginTop: 10,
        marginBottom: 10
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
        if (this.state.archiveEmployee === true ){
            swal({
                title: "Are you sure?",
                text: "Once removed, you will not be able to recover this employee!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        this.props.dispatch({
                            type: 'UPDATE_USER_ADMIN',
                            payload: this.state
                        });
                        this.props.clearEditUser();
                    } 
                });
        }else if(this.state.archiveEmployee=== false){
        this.props.dispatch({
            type: 'UPDATE_USER_ADMIN',
            payload: this.state
        });
        this.props.clearEditUser();}
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
        this.props.clearEditUser();
    }
    clearEdit = () => {
        this.props.clearEditUser();
    }
    componentDidUpdate() {
        this.propsChange();
    }
    render() {
        const { classes } = this.props;

        console.log('newuserform props', this.props)
        return (
            <>
                <Grid container direction="row" justify='space-evenly' alignItems="center"  >
                    <Grid item xs={11} style={{ textAlign: 'center' }}>
                        <Typography variant='h4' >{this.props.edit ? 'Edit User:' : 'Add New User:'}</Typography>
                        <form onSubmit={this.props.edit ? this.saveChanges : this.handleSubmit}>
                            <Grid container justify='center'>
                                <Grid item xs={12} sm={12} md={4} lg={3}>{/* this is for the outer containers*/}
                                    <Grid container direction="row" justify='space-evenly' alignItems="center" >
                                        {/* this is for the inner of the outer containers*/}
                                        <Grid item xs={10} sm={8} md={6} lg={8} style={{ textAlign: 'center' }}>
                                            <TextField required fullWidth className={classes.input}
                                                onChange={this.handleChange}
                                                id="outlined"
                                                label="FirstName"//this is for the Add User info
                                                value={this.state.firstName}
                                                variant="outlined"
                                                name='firstName'
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={3}>{/* this is for the outer containers*/}
                                    <Grid container direction="row" justify='space-evenly' alignItems="center">
                                        <Grid item xs={10} sm={8} md={6} lg={8}>{/* this is for the inner of the outer containers*/}
                                            <TextField required fullWidth className={classes.input}
                                                onChange={this.handleChange}
                                                id="outlined"
                                                label="LastName"//this is for the Add User info
                                                value={this.state.lastName}
                                                variant="outlined"
                                                name='lastName'
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={3}>{/* this is for the outer containers*/}
                                    <Grid container direction="row" justify='space-evenly' alignItems="center">
                                        <Grid item xs={10} sm={8} md={6} lg={8}>{/* this is for the inner of the outer containers*/}
                                            <TextField required fullWidth className={classes.input}
                                                onChange={this.handleChange}
                                                id="outlined"
                                                label="Email"//this is for the Add User info
                                                value={this.state.email}
                                                variant="outlined"
                                                name='email'
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={3}>{/* this is for the outer containers*/}
                                    <Grid container direction="row" justify='space-evenly' alignItems="center" >
                                        <Grid item xs={10} sm={8} md={6} lg={8}>{/* this is for the inner of the outer containers*/}
                                            <FormControl fullWidth variant="outlined" >
                                                <InputLabel id="role">Role</InputLabel>
                                                <Select required id="role" labelId="Role" className={classes.input}
                                                    name='role' value={this.state.role}//this is for the Add User info
                                                    onChange={this.handleChange}>
                                                    <MenuItem value={1}>Admin</MenuItem>
                                                    <MenuItem value={2}>Maintenance</MenuItem>
                                                    <MenuItem value={3}>Resident Coordinator</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {/* --this is for the Edit user info-- */}
                                {this.props.edit && <>
                                    <Grid item xs={12} sm={12} md={4} lg={3}>{/* this is for the outer containers*/}
                                        <Grid container direction="row" justify='space-evenly' alignItems="center" >
                                            <Grid item xs={10} sm={8} md={6} lg={8}>{/* this is for the inner of the outer containers*/}
                                                <FormControl fullWidth variant="outlined" >
                                                    <InputLabel > Employee Status</InputLabel>
                                                    <Select className={classes.input}
                                                        fullWidth name="archiveEmployee"//this is for the Edit user info
                                                        onChange={this.handleChange} value={this.state.archiveEmployee}>
                                                        <MenuItem value={false}>Active</MenuItem>
                                                        <MenuItem value={true}>Removed</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </>}
                                <Grid item xs={12} sm={12} md={4} lg={3}>{/* this is for the outer containers*/}
                                    <Grid container direction="row" justify='space-evenly' alignItems="center">
                                        <Grid item xs={10} sm={8} md={6} lg={8}>{/* this is for the inner of the outer containers*/}
                                            <TextField required fullWidth className={classes.input}
                                                onChange={this.handleChange}
                                                id="outlined"
                                                label="Username"//this is for the Add User info
                                                value={this.state.username}
                                                variant="outlined"
                                                name='username'
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                {!this.props.edit &&
                                    <>
                                        <Grid item xs={12} sm={12} md={4} lg={3}>{/* this is for the outer containers*/}
                                            <Grid container direction="row" justify='space-evenly' alignItems="center">
                                                <Grid item xs={10} sm={8} md={6} lg={8}>{/* this is for the inner of the outer containers*/}

                                                    <TextField required fullWidth className={classes.input} onChange={this.handleChange}
                                                        id="outlined"
                                                        label="Password"//this is for the Add User info
                                                        value={this.state.password}
                                                        variant="outlined"
                                                        name='password'
                                                    />

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </>}
                                {/*Save Changes is for the Edit User view*/}
                                {/*Add New User is for the Add New User view*/}
                                <Grid item xs={12}  >
                                    <Grid item style={{ textAlign: 'center', marginBottom: 15 }}>
                                        {this.props.edit ?
                                            <Button type="submit" color="primary" variant="contained">Save Changes</Button> :
                                            <Button type="submit" color="primary" variant="contained">Add New User</Button>}
                                    </Grid>
                                </Grid>
                                {this.props.edit &&
                                    <Grid item xs={12}  >
                                        <Grid item style={{ textAlign: 'center', marginBottom: 15 }}>
                                            <Button onClick={this.clearEdit} color="primary" variant="contained">Cancel</Button>

                                        </Grid>
                                    </Grid>}
                            </Grid>

                        </form>
                        {/* this is for the Edit User info */}
                        {this.props.edit &&
                            <form onSubmit={this.updatePassword}>
                                <Grid container justify='center'>
                                    <Grid item xs={12} sm={12} md={4} lg={3}>{/* this is for the outer containers*/}
                                        <Grid container direction="row" justify='space-evenly' alignItems="center">
                                            <Grid item xs={10} sm={8} md={6} lg={8}>{/* this is for the inner of the outer containers*/}
                                                <TextField required fullWidth style={{ textAlign: 'center', marginBottom: 15 }}
                                                    onChange={this.handleChange}
                                                    id="outlined"
                                                    label="Password"//this is for the Edit user info
                                                    value={this.state.password}
                                                    variant="outlined"
                                                    name='password'
                                                /> <Grid item style={{ textAlign: 'center', marginBottom: 15 }}>
                                                    <Button type="submit" color="primary" variant="contained" > Update Password</Button>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </form>}
                    </Grid>
                </Grid>
            </>)
    };
}

export default connect()(withStyles(styles, { withTheme: true })(NewUserForm));
