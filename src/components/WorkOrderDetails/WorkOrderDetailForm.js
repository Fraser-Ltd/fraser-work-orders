import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';


//material ui imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { FormControl, FormControlLabel, withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    right: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'left'
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'right'
        }
    },
    left: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'left'
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'left'
        }
    },
})




class WorkOrderDetailForm extends Component {
    state = {
        workOrderId: this.props.workOrder.id,
        permissionToEnter: this.props.workOrder.permission_to_enter,
        doorHanger: this.props.workOrder.door_hanger,
        emergency: this.props.workOrder.emergency,
        workToBeDone: this.props.workOrder.work_to_be_done || '',
        detailsOfWorkDone: this.props.workOrder.details_of_work_done || '',//if details is null value will be empty string
        status: this.props.workOrder.status,
        assignedTo: this.props.workOrder.assigned_to || '',//if assigned_to is null set it to an empty string
        reacInspection: this.props.workOrder.reac_inspection,
        smokeDetectors: this.props.workOrder.smoke_detectors,
        housekeepingInspection: this.props.workOrder.housekeeping_inspection,
        exterminating: this.props.workOrder.exterminating,
        remarks: this.props.workOrder.remarks,
        unitId: this.props.workOrder.unit_id,
        tenantNotHome: this.props.workOrder.tenant_not_home,
        priority: this.props.workOrder.priority || '',// priority will always come in as null the first time so we set it to an empty string
        timeIn: this.props.workOrder.time_in,
        timeOut: this.props.workOrder.time_out,
        dateCompleted: this.props.workOrder.date_completed
    }


    componentDidMount() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    submit = (event) => {
        event.preventDefault();
        if (this.props.user.role === 2 && this.state.status === 'Assigned To Maintenance') {
            this.props.dispatch({ type: 'UPDATE_WORKORDERS', payload: { ...this.state, priority: this.state.priority === '' ? 0 : this.state.priority, status: 'Reviewed by Maintenance' } });

        } else {
            this.props.dispatch({ type: 'UPDATE_WORKORDERS', payload: { ...this.state, priority: this.state.priority === '' ? 0 : this.state.priority, assignedTo: this.state.assignedTo === ''? null: this.state.assignedTo } });
        }

        this.props.history.push('/workorders');
    }

    dateComplete = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    assignWorkOrder = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value,
            status: 'Assigned To Maintenance'
        });
    }

    handleCheck = (event) => {
        console.log(event.target.name)
        console.log(event.target.checked)
        this.setState({
            [event.target.name]: event.target.checked
        })
    }

    timeIn = () => {
        this.props.dispatch({ type: 'SET_TIMEIN', payload: { workOrderId: this.state.workOrderId } })
    }

    timeOut = () => {
        this.props.dispatch({ type: 'SET_TIMEOUT', payload: { workOrderId: this.state.workOrderId } })
    }
    handleSelect = (event) => {
        // console.log(event.target.name);
        // console.log(event.target.value);
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        });
    }

    handleStatus = (event) => {
        if (event.target.value === 'Complete') { this.props.dispatch({ type: 'SET_DATECOMPLETED', payload: { workOrderId: this.state.workOrderId } }) }
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    back = () => {
        this.props.history.push('/workorders');
    }


    render() {
        const { classes } = this.props;
        return (
            <>
                <Grid
                    container
                    justify="center"
                    spacing={0}

                >
                    <Grid item xs={12} style={{ textAlign: 'center' }}>
                        <Typography variant='h2'>Work Order Details</Typography>
                    </Grid>

                    <Grid item xs={11} sm={10} md={10} lg={8} xl={6} style={{ marginTop: 25 }} >
                        <Paper>
                            <Grid container justify="center">
                                <Grid item xs={10} className={classes.right} >
                                    <form onSubmit={this.submit}>
                                        <Grid item xs={12} style={{ marginBottom: 50, marginTop: 15 }}>
                                            <Typography>Work Order #{this.props.workOrder.id}</Typography>
                                        </Grid>
                                        <Grid container  >

                                            <Grid item xs={12} md={6}>
                                                <Grid container className={classes.left} >
                                                    <Grid item xs={12}>
                                                        <Typography><strong>Name:</strong> {this.props.property.property_name}</Typography>
                                                    </Grid>
                                                    {this.props.unit !== null && <Grid item xs={12}>
                                                        <Typography><strong>Unit:</strong> {this.props.unit.unit}</Typography>
                                                    </Grid>}
                                                    <Grid item xs={12} >
                                                        <Typography><strong>Address:</strong> {this.props.property.property_address}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography><strong>Date Submitted:</strong>  {moment(this.props.workOrder.date_added).calendar()}</Typography>
                                                <Typography><strong>Submitted By: </strong>{this.props.addedBy.first_name} {this.props.addedBy.last_name}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction='row-reverse'>
                                            <Grid item xs={12} md={6}>
                                                <Grid container justify='flex-end'>
                                                    <Grid item xs={12} md={8}>
                                                        <FormControl style={{ marginBottom: 10 }} fullWidth >
                                                            <InputLabel >Status</InputLabel>
                                                            <Select fullWidth name="status" value={this.state.status} onChange={this.handleStatus}>
                                                                <MenuItem value={'Submitted'}>Submitted</MenuItem>
                                                                <MenuItem value={'Assigned To Maintenance'}>Assigned To Maintenance</MenuItem>
                                                                <MenuItem value={'Reviewed by Maintenance'}>Reviewed by Maintenance</MenuItem>
                                                                <MenuItem value={'Waiting on Parts'}>Waiting on Parts</MenuItem>
                                                                <MenuItem value={'Complete'}>Work Complete</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl style={{ marginBottom: 10 }} fullWidth >
                                                            <InputLabel >Assigned To:</InputLabel>
                                                            <Select disabled={this.props.user.role > 1} required={this.props.user.role < 2} fullWidth name="assignedTo" value={this.state.assignedTo} onChange={this.assignWorkOrder}>
                                                                {this.props.allUsers.filter(user => user.role === 2)
                                                                    .map(user => <MenuItem
                                                                        key={user.id}
                                                                        value={user.id}>{user.first_name} {user.last_name}
                                                                    </MenuItem>)}
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl style={{ marginBottom: 10 }} fullWidth >
                                                            <InputLabel >Priority:</InputLabel>
                                                            <Select disabled={this.props.user.role > 2} fullWidth name="priority" value={this.state.priority} onChange={this.handleSelect}>
                                                                <MenuItem value={0}>No Priority</MenuItem>
                                                                <MenuItem value={1}>Low</MenuItem>
                                                                <MenuItem value={2}>High</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl style={{ marginBottom: 10 }} fullWidth >
                                                            <InputLabel  >Order Type:</InputLabel>
                                                            <Select disabled={this.props.user.role > 2} fullWidth name="emergency" value={this.state.emergency} onChange={this.handleSelect}>
                                                                <MenuItem value={false}>Non-Emergency</MenuItem>
                                                                <MenuItem value={true}>Emergency</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Grid>


                                            <Grid item xs={12} md={6} >
                                                <Grid container style={{ textAlign: 'left' }}>
                                                    <Grid item xs={12}>
                                                        <FormControlLabel
                                                            label="Permission To Enter"
                                                            labelPlacement='end'
                                                            style={{ marginLeft: 0 }}
                                                            control={<Checkbox color="primary"
                                                                onClick={this.handleCheck}
                                                                checked={this.state.permissionToEnter}
                                                                name='permissionToEnter' />}
                                                        /><br />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <FormControlLabel
                                                            label="Door Hanger Left"
                                                            labelPlacement='end'
                                                            style={{ marginLeft: 0 }}
                                                            control={<Checkbox color="primary"
                                                                onClick={this.handleCheck}
                                                                checked={this.state.doorHanger}
                                                                name='doorHanger' />}
                                                        /><br />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <FormControlLabel
                                                            label="Tenant Not Home"
                                                            labelPlacement='end'
                                                            style={{ marginLeft: 0 }}
                                                            control={<Checkbox color="primary"
                                                                onClick={this.handleCheck}
                                                                checked={this.state.tenantNotHome}
                                                                name='tenantNotHome' />}
                                                        /><br />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <TextField
                                            onChange={this.handleSelect}
                                            fullWidth
                                            id="outlined-multiline-static"
                                            label="Work To Be Done"
                                            multiline
                                            rows={4}
                                            value={this.state.workToBeDone}
                                            name='workToBeDone'
                                            variant="outlined"

                                        /><br /><br />
                                        <TextField
                                            onChange={this.handleSelect}
                                            fullWidth
                                            disabled={this.props.user.role > 2}
                                            id="outlined-multiline-static"
                                            label="Details of Work Done"
                                            multiline
                                            value={this.state.detailsOfWorkDone}
                                            name='detailsOfWorkDone'
                                            rows={4}
                                            variant="outlined"

                                        /><br /><br />
                                        <Grid container style={{ marginBottom: 15 }} justify='center'>
                                            <Grid style={{ textAlign: 'center', marginTop: 15, marginBottom: 15 }} item xs={12} md={4}>
                                                <Typography><strong>Date Completed: </strong> <br />{this.props.workOrder.date_completed === null ? '' : moment(this.props.workOrder.date_completed).format('MMMM Do YYYY')}</Typography>
                                            </Grid>
                                            <Grid style={{ textAlign: 'center', marginTop: 15, marginBottom: 15 }} item xs={12} md={4}>
                                                {this.props.workOrder.time_in && <Typography><strong>Time In: </strong><br />{moment(this.props.workOrder.time_in).format('MMMM Do YYYY, h:mm a')}</Typography>}
                                                {this.props.workOrder.time_in == null &&
                                                    <Tooltip title={this.props.user.role === 2 ? '' : 'Only available to maintenance'}>
                                                        <span>
                                                            <Button variant='contained' disabled={this.props.user.role !== 2} onClick={this.timeIn}>Time In</Button>
                                                        </span>
                                                    </Tooltip>}
                                            </Grid>
                                            <Grid style={{ textAlign: 'center', marginTop: 15, marginBottom: 15 }} item xs={12} md={4}>
                                                {this.props.workOrder.time_out && <Typography><strong>Time Out: </strong><br />{moment(this.props.workOrder.time_out).format('MMMM Do YYYY, h:mm a')}</Typography>}
                                                {this.props.workOrder.time_out == null &&
                                                    <Tooltip title={this.props.user.role === 2 ? '' : 'Only available to maintenance'}>
                                                        <span>
                                                            <Button variant='contained' disabled={this.props.user.role !== 2} onClick={this.timeOut}>Time Out</Button>
                                                        </span>
                                                    </Tooltip>}
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} md={6} >
                                            <Grid container style={{ textAlign: 'left' }}>
                                                <Grid style={{ marginBottom: 15 }} item xs={12}>
                                                    <FormControlLabel
                                                        label="Work needed as result of REAC or QMR inspection"
                                                        labelPlacement='end'
                                                        style={{ marginLeft: 0 }}
                                                        control={<Checkbox color="primary"
                                                            onClick={this.handleCheck}
                                                            checked={this.state.reacInspection}
                                                            name='reacInspection' />}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Typography><strong>Mandated Checks:</strong></Typography>
                                                    <FormControlLabel
                                                        label="All smoke detectors operational"
                                                        labelPlacement='end'
                                                        style={{ marginLeft: 0 }}
                                                        control={<Checkbox color="primary"
                                                            onClick={this.handleCheck}
                                                            checked={this.state.smokeDetectors}
                                                            name='smokeDetectors' />}
                                                    /><br />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControlLabel
                                                        label="Housekeeping Inspection Required"
                                                        labelPlacement='end'
                                                        style={{ marginLeft: 0 }}
                                                        control={<Checkbox color="primary"
                                                            onClick={this.handleCheck}
                                                            checked={this.state.housekeepingInspection}
                                                            name='housekeepingInspection' />}
                                                    /><br />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <FormControlLabel
                                                        label="Extermination needed"
                                                        labelPlacement='end'
                                                        style={{ marginLeft: 0 }}
                                                        control={<Checkbox color="primary"
                                                            onClick={this.handleCheck}
                                                            checked={this.state.exterminating}
                                                            name='exterminating' />}
                                                    /><br />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item style={{ textAlign: 'center', marginBottom: 15 }}>
                                            <Button type="submit" color="primary" variant="contained">Submit</Button>{'  '}
                                            <Button color="primary" variant="contained" onClick={this.back}>Cancel</Button>

                                        </Grid>
                                    </form>
                                </Grid>
                            </Grid>
                        </Paper>

                    </Grid>
                </Grid>
            </>
        );
    }

}
const mapStateToProps = (state) => ({ user: state.user });

export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(withRouter(WorkOrderDetailForm)));