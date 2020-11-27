import React , { Component} from 'react';
import moment from 'moment';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


//material ui imports
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core';


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
        '&:hover': { cursor: 'pointer', backgroundColor:'rgb(222, 221, 221)' }
    },
    red: { backgroundColor: 'rgba(229, 0, 0, 0.6)', color: 'white', '&:hover': { backgroundColor:'rgba(229, 0, 0, 0.75)', cursor:'pointer'}},
    red2:{color:'white'},
    newOrder: {
        margin: 20,
        backgroundColor: 'yellow',
        '&:hover': { backgroundColor: 'green', color: 'white' }
    },
    cells:{
        textAlign:'center',
        '&:hover':{color:'white'}
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
            if(workOrder.priority === (null || 0)) return 'No Priority'
            else if (workOrder.priority === 1) return 'Low'
            else if (workOrder.priority === 2) return 'High'
        }
        return(
            <>
                <TableRow className={workOrder.emergency ? classes.red:classes.row}  onClick={this.details}>
                    <TableCell className={`${classes.cells} ${workOrder.emergency && classes.red2}`}>{workOrder.id}</TableCell>
                    <TableCell className={`${classes.cells} ${workOrder.emergency && classes.red2}`}>{this.props.properties[0] &&
                                this.props.properties.filter(prop => prop.id === workOrder.property_id)[0].property_name}
                    </TableCell>
                    <TableCell className={`${classes.cells} ${workOrder.emergency && classes.red2}`}>{workOrder.work_to_be_done}</TableCell>
                    <TableCell className={`${classes.cells} ${workOrder.emergency && classes.red2}`}>{priority()}</TableCell>
                    <TableCell className={`${classes.cells} ${workOrder.emergency && classes.red2}`}>{workOrder.status}</TableCell>
                    <TableCell className={`${classes.cells} ${workOrder.emergency && classes.red2}`}>{moment(workOrder.date_added).calendar()}</TableCell>
                </TableRow>  
            </>
        );
    }
}
const mapStoreToProps = (store) => ({
    properties: store.properties
})

export default connect(mapStoreToProps)(withStyles(styles, {withTheme:true})(withRouter(WorkOrderTableItem)));