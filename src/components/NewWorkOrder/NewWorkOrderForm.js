import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';


//material ui imports
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { FormControl, FormControlLabel, Typography, withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    input: {
        marginTop: 5,
        marginBottom: 5
    },
    heading:{
        padding: '25px 25px 0px 25px'
    }
})




class NewWorkOrderForm extends Component {
    state = {
        propertyId: '',
        dateAdded: moment().format(),
        permissionToEnter: false,
        emergency: false,
        workToBeDone: '',
        status: 'Submitted',
        addedById: this.props.user.id,
        reacInspection: false,
        remarks: '',
        unitId: '',
        tenantNotHome: false,
    }
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER' });
        this.props.dispatch({ type: 'FETCH_UNITS' });
        this.props.dispatch({ type: 'FETCH_PROPERTY' });
    }

    submit = (e) => {
        e.preventDefault()
        this.props.dispatch({ type: 'ADD_WORKORDER', payload: { ...this.state, unitId: this.state.unitId === '' ? null : this.state.unitId } });
        this.setState({
            propertyId: '',
            dateAdded: moment().format(),
            permissionToEnter: false,
            emergency: false,
            workToBeDone: '',
            status: 'Submitted',
            addedById: this.props.user.id,
            reacInspection: false,
            remarks: '',
            unitId: '',
            tenantNotHome: false,
        });
        this.props.history.push('/workorders');
    }

    handleCheck = (event) => {
        console.log(event.target.name)
        console.log(event.target.checked)
        this.setState({
            ...this.state,
            [event.target.name]: event.target.checked
        })
    }

    handleChange = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    back = () => {
        this.props.history.goBack();
    }


    render() {
        const { classes } = this.props;
        console.log('user in new work order is', this.props.user)
        console.log(this.props.properties[0])
       if(this.props.properties[0]){ console.log('filtered properties', this.props.properties.filter(property => property.resident_coordinator === this.props.user.id))}
        return (
            <>
                <Grid
                    container
                    justify="center"
                    spacing={0}

                >

                    <Grid item xs={11} sm={6} md={5} lg={4} style={{ marginTop: 25 }} >
                        <Paper>
                            <Grid item xs={12} style={{ textAlign: 'center' }}>
                                <Typography className={classes.heading} variant='h2'>Add New Work Order</Typography>
                                <Typography variant='caption'>If the property you are looking for is not in this list please contact admin and they will add it</Typography>
                            </Grid>
                            <Grid container justify="center">
                                <Grid item xs={10}  >
                                    <form onSubmit={this.submit}>
                                        <Grid item xs={12}>
                                            <Grid container direction='column' alignItems='center'   >
                                                <Grid container justify='center'>
                                                    <Grid item xs={12} sm={10} md={8} lg={6}>
                                                        { 
                                                            <TextField className={classes.input} select variant='outlined' label='Property:' required fullWidth name="propertyId" value={this.state.propertyId} onChange={this.handleChange}>
                                                                {this.props.properties[0] && (this.props.user.role === 3 ? 
                                                                    this.props.properties.filter(property => property.resident_coordinator === this.props.user.id).map(property => <MenuItem key={property.id} value={property.id}>{property.property_name}</MenuItem>)
                                                                :
                                                                this.props.properties.map(property => <MenuItem key={property.id} value={property.id}>{property.property_name}</MenuItem>))}
                                                            </TextField>
                                                        }
                                                    </Grid>
                                                </Grid>
                                                {this.state.propertyId !== '' &&
                                                    this.props.units[0] && this.props.units.filter(unit => unit.property_id === this.state.propertyId)[0] &&
                                                    <Grid container justify='center'>
                                                        <Grid item xs={12} sm={10} md={8} lg={6}>

                                                                <TextField select className={classes.input} label='Unit:' variant='outlined' required fullWidth name="unitId" value={this.state.unitId} onChange={this.handleChange}>
                                                                    {this.props.units[0] && this.props.units.filter(unit => unit.property_id === this.state.propertyId).map(unit => <MenuItem key={unit.id} value={unit.id}>{unit.unit}</MenuItem>)}
                                                                </TextField>
                                                        </Grid>
                                                    </Grid>}
                                                <Grid container justify='center'>
                                                    <Grid item xs={12} sm={10} md={8} lg={6}>
                                                            <TextField variant='outlined' select className={classes.input} label='Order Type:' fullWidth name="emergency" value={this.state.emergency} onChange={this.handleChange}>
                                                                <MenuItem value={false}>Non-Emergency</MenuItem>
                                                                <MenuItem value={true}>Emergency</MenuItem>
                                                            </TextField>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>


                                        <Grid item xs={12} >
                                            <Grid container direction='column' alignItems='center' justify='center' style={{ textAlign: 'left', marginBottom: 15 }}>
                                                <Grid item xs={12}>
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
                                                            label="Tenant Not Home"
                                                            labelPlacement='end'
                                                            style={{ marginLeft: 0 }}
                                                            control={<Checkbox color="primary"
                                                                onClick={this.handleCheck}
                                                                checked={this.state.tenantNotHome}
                                                                name='tenantNotHome' />}
                                                        /><br />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <FormControlLabel
                                                            label="Work needed as a result of REAC Inspection or QMR Inspection"
                                                            labelPlacement='end'
                                                            style={{ marginLeft: 0 }}
                                                            control={<Checkbox color="primary"
                                                                onClick={this.handleCheck}
                                                                checked={this.state.reacInspection}
                                                                name='reacInspection' />}
                                                        /><br />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>


                                        <TextField
                                            onChange={this.handleChange}
                                            fullWidth
                                            value={this.state.workToBeDone}
                                            name='workToBeDone'
                                            id="outlined-multiline-static"
                                            label="Work To Be Done"
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            required
                                        /><br /><br />

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

const mapStateToProps = (store) => ({ properties: store.properties, units: store.units, user: store.user })

export default connect(mapStateToProps)(withRouter(withStyles(styles, { withTheme: true })(NewWorkOrderForm)));