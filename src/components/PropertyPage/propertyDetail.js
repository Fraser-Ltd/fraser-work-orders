import React, { Component } from 'react';
import { connect } from 'react-redux';

//material ui imports
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';


const styles = theme => ({
    root: {
        marginTop: 30,
        marginBottom: 15,
        maxHeight: 250,
    },
    heading: {
        textAlign: 'center',
        marginTop: 10
    },
    addProperty: {
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    input: {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    buttonContainer: {
        textAlign: 'center'
    },
    Button: {
        marginTop: 10,
        marginBottom: 10
    },
    tableHeading: {
        textAlign: 'center'
    },
    cell: {
        textAlign: 'center',
        cursor: 'pointer'
    },
});

class propertyDetail extends Component {

    // Sets local state for the propertyDetail component

    state = {
        propertyName: this.props.properties.propertyName,
        propertyAddress: this.props.properties.propertyAddress,
        residentCoordinator: this.props.properties.residentCoordinator,
        id: this.props.properties.id,
        unit: '',
        unitId: '',
        editUnit: false,

    }


    editUnit = (unitId, unit) => {
        this.setState({
            editUnit: true,
            unitId: unitId,
            unit: unit,
        })
    }

    //  const id = req.body.id
    // const propertyName = req.body.property_ID
    // const unitNumber = req.body.property_Unit


    saveUnit = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'EDIT_UNITS',
            payload: {
                property_ID: this.state.id,
                id: this.state.unitId,
                property_Unit: this.state.unit
            }
        });
        this.setState({
            ...this.state,
            unit: '',
            unitId: '',
            editUnit: false,
        });
    }

    addUnit = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_UNITS',
            payload: {
                property_ID: this.state.id,
                property_Unit: this.state.unit
            }
        });
        this.setState({
            ...this.state,
            unit: '',
        })
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_PROPERTY'
        })
        this.props.dispatch({
            type: 'GET_USERS'
        });
        this.props.dispatch({
            type: 'FETCH_UNITS'
        });
        console.log('after component did mount', this.props)
    }
    componentDidUpdate() {
        this.propsChange();

    }

    deleteProperty = (event) => {
        console.log('in delete property', this.props.properties.id);
        event.preventDefault();
        this.props.dispatch({
            type: 'LOOSE_PROPERTY',
            payload: this.props.properties.id
        })
    }

    saveChanges = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'EDIT_PROPERTY',
            payload: this.state
        })
        this.props.clearEditProperty();
    }
    propsChange = () => {
        if (this.props.properties.id !== this.state.id) {
            this.setState({
                propertyName: this.props.properties.propertyName,
                propertyAddress: this.props.properties.propertyAddress,
                residentCoordinator: this.props.properties.residentCoordinator,
                id: this.props.properties.id,
            });
        }
    }



    handleChange = (event) => {
        console.log('in handleChange', event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    handleSubmit = (event) => {
        console.log('in handleSubmit', this.state)
        event.preventDefault();
        this.props.dispatch({
            type: "ADD_PROPERTY",
            payload: this.state
        })
        this.setState({
            propertyName: '',
            propertyAddress: '',
            residentCoordinator: '',
            id: '',
        });
    }



    render() {
        const { classes } = this.props;
        console.log('property detail props', this.props);
        console.log('this.state', this.state);

        return (
            <Grid container justify={this.props.edit ? 'space-evenly' : 'center'}>

                <Grid item xs={11} sm={10} md={4} lg={3}>
                    <Card>
                        <Grid item xs={12} className={classes.heading}>
                            <Typography className={classes.heading} variant='h3'>{this.props.heading}</Typography>
                        </Grid>
                        <form onSubmit={this.handleSubmit}>
                            <Grid container direction='column' alignItems='center'>
                                <Grid container justify='center'>
                                    <Grid item xs={11}>
                                        <TextField required className={classes.input} fullWidth variant='outlined' name='propertyName' type='text' value={this.state.propertyName} onChange={this.handleChange} label='Property Name' />
                                    </Grid>
                                </Grid>
                                <Grid container justify='center'>
                                    <Grid item xs={11}>
                                        <TextField required className={classes.input} fullWidth variant='outlined' name='propertyAddress' type='text' value={this.state.propertyAddress} onChange={this.handleChange} label='Property Address' />
                                    </Grid>
                                </Grid>
                                {this.props.users[0] &&
                                    <Grid container justify='center'>
                                        <Grid item xs={11}>
                                            <TextField required className={classes.input} fullWidth variant='outlined' label='Resident Coordinator' select onChange={this.handleChange} name='residentCoordinator' value={this.state.residentCoordinator}>
                                                <MenuItem value=''></MenuItem>
                                                {this.props.users.filter(user => user.role !== 2)
                                                    .map(user => <MenuItem key={user.id} value={user.id}>{user.first_name} {user.last_name}</MenuItem>)}
                                            </TextField>
                                        </Grid>
                                    </Grid>}
                                {!this.props.edit &&
                                    <Grid className={classes.buttonContainer} item xs={12}>
                                        <Button color='primary' className={classes.Button} variant='contained' type="submit">Add New Property</Button>
                                    </Grid>
                                }
                                {this.props.edit &&
                                    <>
                                        <Grid item xs={12}>
                                            <Button color='primary' className={classes.Button} variant='contained' onClick={this.saveChanges}>Save Changes</Button>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button color='primary' className={classes.Button} variant='contained' onClick={this.props.clearEditProperty}>Cancel</Button>
                                        </Grid>
                                    </>
                                }
                            </Grid>
                        </form>
                    </Card>
                </Grid>
                {this.props.units[0] && this.props.edit &&
                    <Grid item xs={11} sm={10} md={4} lg={3}>
                        <Paper>
                            <Grid container direction='column' alignItems='center'>
                                <Grid container justify='center'>
                                    <Grid item xs={6}>
                                        <TableContainer className={classes.root} component={Paper}>
                                            <Table stickyHeader size='medium'>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell className={classes.tableHeading}>{this.state.propertyName} Units</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {this.props.units.filter(units => units.property_id === this.state.id)
                                                        .map(unit =>
                                                            <TableRow onClick={() => this.editUnit(unit.id, unit.unit)}>
                                                                <TableCell className={classes.cell} key={unit.id} value={unit.unit}>
                                                                    {unit.unit}
                                                                </TableCell>
                                                            </TableRow>)}
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </Grid>
                                </Grid>

                                {this.props.edit && <>
                                    <form onSubmit={this.state.editUnit ? this.saveUnit : this.addUnit}>
                                        <Grid item xs={12}>
                                            <TextField  className={classes.input} required variant='outlined' label='Unit Name' name='unit' value={this.state.unit} onChange={this.handleChange} />
                                        </Grid>
                                        {this.state.editUnit ? 
                                        <Grid item xs={12}>
                                            <Button color='primary' className={classes.Button} type='submit' variant='contained' >Save Changes</Button>
                                        </Grid> : 
                                        <Grid className={classes.buttonContainer} item xs={12}>
                                            <Button className={classes.Button} color='primary' type='submit' variant='contained' >Add Unit</Button>
                                        </Grid>}
                                    </form>
                                </>}
                            </Grid>
                        </Paper>
                    </Grid>}
            </Grid >
        )
    };
}

const mapStoreToProps = (store) => ({
    users: store.allUsers,
    units: store.units
})

export default connect(mapStoreToProps)(withStyles(styles, { withTheme: true })(propertyDetail));
