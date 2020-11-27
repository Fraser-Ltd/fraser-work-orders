import React, { Component } from 'react';
import moment from 'moment';


//material ui imports
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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
    newOrder: {
        margin: 20,
        backgroundColor: 'yellow',
        '&:hover': { backgroundColor: 'green', color: 'white' }
    },
    cells: {
        textAlign: 'center',
    },
});

class AdminUserPageTableItem extends Component {

    clicked = ()=>{
        this.props.clearEditUser();
        let user = this.props.userList
        console.log('in rowclicked', user.id)
        this.props.editUser(user.first_name, user.last_name, user.email, user.role, user.username, user.id, user.archive_employee)
}
render() {
    const allUsers = this.props.userList;
    const role = () => {
        if (allUsers.role == 1) return 'Admin'
        else if (allUsers.role == 2) return 'Maintenance'
        else if (allUsers.role == 3) return 'Resident Coordinator'
    }
        const { classes } = this.props;
        console.log(this.props.userList);
        return (
            <>
                <TableRow className={classes.row} hover={true} onClick={this.clicked}>
                    <TableCell className={classes.cells}>{allUsers.first_name}</TableCell>
                    <TableCell className={classes.cells}>{allUsers.last_name}</TableCell>
                    <TableCell className={classes.cells}>{allUsers.email}</TableCell>
                    <TableCell className={classes.cells}>{role()}</TableCell>
                    <TableCell className={classes.cells}>{allUsers.username}</TableCell>
                </TableRow>
            </>
        );
    }
}


export default withStyles(styles, { withTheme: true })(AdminUserPageTableItem);