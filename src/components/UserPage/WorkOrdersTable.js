import React, {Component} from 'react';
import { connect } from 'react-redux';
import WorkOrderTableItem from './WorkOrderTableItem';

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
        textAlign:'center'
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



class WorkOrdersTable extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: "FETCH_PROPERTY" });
    };
    
    render(){
        const {classes} = this.props;
        return(
            <>
                <Grid container justify='center'>
                    <Grid item xs={11}>
                        <Paper>
                        <Typography variant='h3' className={classes.heading}>{this.props.heading}</Typography>
                        <TableContainer className={classes.root} component={Paper}>
                            <Table stickyHeader size='medium'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className={classes.tableHeading}>W.O #</TableCell>
                                        <TableCell className={classes.tableHeading}>Property</TableCell>
                                        <TableCell className={classes.tableHeading}>Description</TableCell>
                                        <TableCell className={classes.tableHeading}>Priority</TableCell>
                                        <TableCell className={classes.tableHeading}>Status</TableCell>
                                        <TableCell className={classes.tableHeading}>Date Submitted</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.props.workOrders[0] && this.props.workOrders
                                    .map((workOrder) => 
                                    <WorkOrderTableItem workOrder={workOrder} key={workOrder.id} /> 
                                    )}
                                    
                                </TableBody>
                            </Table>
                        </TableContainer>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        );
    }
}


export default connect()(withStyles(styles, {withTheme: true})(WorkOrdersTable));