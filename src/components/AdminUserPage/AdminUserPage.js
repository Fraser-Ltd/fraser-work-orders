import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminUserPageTableItem from './AdminUserPageTableItem';
import NewUserForm from './NewUserForm';

//material-ui imports
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core';

const styles = theme => ({
    root: {
        marginTop: 10,
        marginBottom: 40,
        maxHeight: 400
    },
    heading: {
        padding: 15,
        textAlign: 'center'
    },
    tableHeading: {
        textAlign: 'center',
    },
    row: {
        '&:hover': { cursor: 'pointer' }
    },
    newOrder: {
        margin: 20,
        backgroundColor: 'yellow',
        '&:hover': { backgroundColor: 'green', color: 'white' }
    },
});


class AdminUserPage extends Component {
    state = {
        edit: false,
        user: {
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            username: '',
            password: '',
            id: ''
        }
    }
    clearEditUser = ()=>{
        this.setState({
            edit: false,
            user: {
                firstName: '',
                lastName: '',
                email: '',
                role: '',
                username: '',
                password: '',
                id: ''
            }
        })
    }
    editUser = (firstName, lastName, email, role, username, id) =>{
        console.log('in editUser id is', id)
        this.setState ({
            edit: true,
            user: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                role: role,
                username: username,
                id: id
            }
        })
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'GET_USERS'
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

    
    render(){// tables the user admin would see
        const { classes } = this.props;
        return (
            <>
                <Grid container justify='center'>

                    <Grid item xs={11}>
                        <Paper>
                            <Typography variant='h3' className={classes.heading}>Current Users</Typography>
                            <TableContainer className={classes.root} component={Paper}>
                                <Table stickyHeader size='medium'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}>First Name</TableCell>
                                            <TableCell className={classes.tableHeading}>Last Name</TableCell>
                                            <TableCell className={classes.tableHeading}>E-mail</TableCell>
                                            <TableCell className={classes.tableHeading}>Role</TableCell>
                                            <TableCell className={classes.tableHeading}>Username</TableCell>
                                            
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.allUsers[0] && this.props.allUsers
                                            .map((userList) =>
                                                <AdminUserPageTableItem editUser={this.editUser} userList={userList} key={userList.id} />
                                            )}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {!this.state.edit && <NewUserForm edit={this.state.edit} user={this.state.user}/>}
                            {this.state.edit && <NewUserForm clearEditUser={this.clearEditUser} edit={this.state.edit} user={this.state.user}/>}
                        </Paper>
                    </Grid>
                </Grid>
                
            </>
        );
    }
}
const mapStoreToProps = (store) => ({
    allUsers: store.allUsers
})

export default connect(mapStoreToProps)(withStyles(styles, {withTheme: true})(AdminUserPage));
