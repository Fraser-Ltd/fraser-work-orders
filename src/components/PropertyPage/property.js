import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropertyTableItem from './PropertyTableItem';
import PropertyDetail from './propertyDetail';


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
import Button from '@material-ui/core/Button';
import propertyDetail from './propertyDetail';

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


class property extends Component {

    state = {
        edit: false,
        properties: {
            property_name: '',
            property_address: '',
            resident_coordinator: '',
            id: id
        }
    }   

    clearEditProperty = ()=>{
        this.setState({
            edit: false,
            properties: {
                property_name: '',
                property_address: '',
                resident_coordinator: '',
                id: id
            }
        })
    }

    editProperty = (propertyName, propertyAddress, resCoordinator, id) =>{
        this.setState ({
            edit: true,
            properties: {
                property_name: propertyName,
                property_address: propertyAddress,
                resident_coordinator: resCoordinator,
                id: id
            }
        })
    }

    componentDidMount = () => {
        this.props.dispatch({ type: "FETCH_PROPERTY" });
    };

    onSubmit = (event) => {
        event.preventDefault();

        // simple dispatch for the saga to take care of
        this.props.dispatch({
            type: 'EDIT_PROPERTY',
            payload: this.state
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <>
                <Grid container justify='center'>

                    <Grid item xs={11}>
                        <Paper>
                            <Typography variant='h3' className={classes.heading}>Current Properties</Typography>
                            <TableContainer className={classes.root} component={Paper}>
                                <Table stickyHeader size='medium'>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell className={classes.tableHeading}>Name</TableCell>
                                            <TableCell className={classes.tableHeading}>Address</TableCell>
                                            <TableCell className={classes.tableHeading}>Resident Coordinator</TableCell>
                                            <TableCell className={classes.tableHeading}>Details</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {this.props.properties[0] && this.props.properties.map((property) => 
                                            <PropertyTableItem key={property.id} editProperty={this.editProperty} userList={userList} />
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            {!this.state.edit && <propertyDetail edit={this.state.edit} properties={this.state.properties}/>}
                            {this.state.edit && <propertyDetail clearEditUser={this.clearEditProperty} edit={this.state.edit} user={this.state.user}/>}                            
                        </Paper>
                    </Grid>
                </Grid>
                <PropertyDetail />
            </>
        );
    }
}

const mapStateToProps = (state) => ({ user: state.user, properties: state.properties })


export default connect(mapStateToProps)(withStyles(styles, { withTheme: true })(property));

