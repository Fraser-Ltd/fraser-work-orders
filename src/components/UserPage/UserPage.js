import React, { Component } from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';
import WorkOrdersTable from './WorkOrdersTable';
import {withRouter} from 'react-router-dom';

//material ui imports
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class UserPage extends Component {
  componentDidMount(){
    this.props.dispatch({type:'FETCH_UNITS'});
    this.props.dispatch({ type: 'FETCH_WORKORDERS' });
    this.props.dispatch({ type: 'FETCH_PROPERTY' });
    this.props.dispatch({ type: 'GET_USERS' });
  }
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    const {user} = this.props;
    return (
      <div>
        <h1 id="welcome">Welcome, {this.props.user.username}!</h1>
        <p>Your ID is: {this.props.user.id}</p>
        <Grid container justify='center' alignItems='center'>
          <Grid item style={{textAlign:'center'}} xs={12}>
            <Button color='primary'
                    variant='contained' 
                    style={{ margin: 30 }}
                    onClick={()=> this.props.history.push('/newOrder')}
                    >Create New Work Order</Button>
          </Grid>
          <Grid item xs={11} md={6}>
            <WorkOrdersTable heading={user.role === 1 ?'Work Orders to Assign': 'Work Orders To Review'} />
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
const mapStateToProps = (state) => ({user: state.user, })

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withRouter(UserPage));
