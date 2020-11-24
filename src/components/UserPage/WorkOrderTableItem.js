import React , { Component} from 'react';
import moment from 'moment';
import {withRouter} from 'react-router-dom';


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

class WorkOrderTableItem extends Component {
    
    details = () => {
        this.props.history.push(`/workOrderDetails/${this.props.workOrder.id}`);
    }

    render(){
        const {classes} = this.props;
        const workOrder = this.props.workOrder;
        const priority = () => {
            if(workOrder.priority === null) return 'No Priority'
            else if (workOrder.priority === 1) return 'Low'
            else if (workOrder.priority === 2) return 'High'
        }
        return(
            <>
                <TableRow className={classes.row} hover={true} onClick={this.details}>
                    <TableCell className={classes.cells}>{workOrder.id}</TableCell>
                    <TableCell className={classes.cells}>Fraser 1</TableCell>
                    <TableCell className={classes.cells}>{workOrder.work_to_be_done}</TableCell>
                    <TableCell className={classes.cells}>{priority()}</TableCell>
                    <TableCell className={classes.cells}>{workOrder.status}</TableCell>
                    <TableCell className={classes.cells}>{moment(workOrder.date_added).calendar()}</TableCell>
                </TableRow>  
            </>
        );
    }
}


export default withStyles(styles, {withTheme:true})(withRouter(WorkOrderTableItem));