import React , { Component} from 'react';
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
    cells:{
        textAlign:'center',
    },
});

class PropertyTableItem extends Component {

    render () {
        return(
            <>
                <TableRow className={classes.row} hover={true} onClick={this.clicked}>
                    <TableCell className={classes.cells}>{properties.id}</TableCell>
                    <TableCell className={classes.cells}>{properties.address}</TableCell>
                    <TableCell className={classes.cells}><Button>Details</Button></TableCell>
                </TableRow>  
            </>
        );
    }
    
}

export default withStyles(styles, {withTheme:true})(PropertyTableItem);