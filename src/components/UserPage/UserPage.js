import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import mapStoreToProps from '../../redux/mapStoreToProps';
import WorkOrdersTable from './WorkOrdersTable';

//material ui imports
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class UserPage extends Component {
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.store.user.username}!</h1>
        <p>Your ID is: {this.props.store.user.id}</p>
        <Grid container justify='center' alignItems='center'>
          <Grid item style={{textAlign:'center'}} xs={12}>
            <Button color='primary' variant='contained' style={{ margin: 30 }}>Create New Work Order</Button>
          </Grid>
          <Grid item xs={11} md={6}>
            <WorkOrdersTable heading='Work Orders to Assign' />
          </Grid>
          <Grid item xs={11} md={6}>
            <WorkOrdersTable heading='Current Work Orders' />
          </Grid>
        </Grid>
        <LogOutButton className="log-in" />
      </div>
    );
  }
}

// this allows us to use <App /> in index.js
export default connect(mapStoreToProps)(UserPage);
