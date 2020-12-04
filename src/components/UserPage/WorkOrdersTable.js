import React, { Component } from 'react';
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
        textAlign: 'center'
    },
    subHeading:{
        textAlign:'center'
    },
    tableHeading: {
        textAlign: 'center', cursor: 'pointer',
        '&:hover': { backgroundColor: 'rgb(222, 221, 221)' }
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
    state = {
        order: 'asc'
    }
    getWorkOrders = (heading) => {
        this.setState({ order: this.state.order === 'asc' ? 'desc' : 'asc' });
        this.props.dispatch({ type: 'FETCH_WORKORDERS_ORDER', payload: { column: heading, order: this.state.order } })
    }


    render() {
        const { classes } = this.props;
        return (
            <>
                <Grid container justify='center'>
                    <Grid item xs={11}>
                        <Paper>
                            <Typography variant='h3' className={classes.heading}>{this.props.heading}</Typography>
                            <Typography variant='subtitle1' className={classes.subHeading} >{this.props.description}</Typography>
                            <Typography variant='subtitle1' className={classes.subHeading} >Rows that are red are EMERGENCY orders</Typography>
                            <TableContainer className={classes.root} component={Paper}>
                                <Table stickyHeader size='medium'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading} onClick={() => this.getWorkOrders('id')}>W.O #</TableCell>
                                            <TableCell className={classes.tableHeading} onClick={() => this.getWorkOrders('property_id')} >Property</TableCell>
                                            <TableCell className={classes.tableHeading} onClick={() => this.getWorkOrders('work_to_be_done')}>Description</TableCell>
                                            <TableCell className={classes.tableHeading} onClick={() => this.getWorkOrders('priority')}>Priority</TableCell>
                                            <TableCell className={classes.tableHeading} onClick={() => this.getWorkOrders('status')}>Status</TableCell>
                                            <TableCell className={classes.tableHeading} onClick={() => this.getWorkOrders('date_added')}>Date Submitted</TableCell>
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


export default connect()(withStyles(styles, { withTheme: true })(WorkOrdersTable));