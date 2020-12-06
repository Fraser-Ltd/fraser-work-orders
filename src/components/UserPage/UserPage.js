import React, { Component } from 'react';
import { connect } from 'react-redux';
import WorkOrdersTable from './WorkOrdersTable';
import { withRouter } from 'react-router-dom';

//material ui imports
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_UNITS' });
    this.props.dispatch({ type: 'FETCH_WORKORDERS' });
    this.props.dispatch({ type: 'FETCH_PROPERTY' });
    this.props.dispatch({ type: 'GET_USERS' });
    this.props.dispatch({ type: 'FETCH_COMPLETEDWORKORDERS', payload: { column: 'id', order: 'asc' } });
  }
  // this component doesn't do much to start, just renders some user info to the DOM
  render() {
    const { user } = this.props;
    let filteredOrders = [];
    let filteredOrders2 = [];

    if (this.props.workOrders[0]) {
      switch (user.role) {
        case 1:
          filteredOrders = this.props.workOrders.filter(workOrder => workOrder.status === 'Submitted');
          filteredOrders2 = this.props.workOrders.filter(workOrder => workOrder.status !== 'Submitted');
          break;
        case 2:
          filteredOrders = this.props.workOrders.filter(workOrder => workOrder.status === 'Assigned To Maintenance');
          filteredOrders2 = this.props.workOrders.filter(workOrder => workOrder.status !== 'Assigned To Maintenance');
          break;
        case 3:
          filteredOrders2 = this.props.workOrders
          break;
        default:
          break;
      }
    }


    return (
        <Grid container justify='center'>
          <Grid item style={{ textAlign: 'center' }} xs={12}>
            <Button color='primary'
              variant='contained'
              style={{ margin: 30 }}
              onClick={() => this.props.history.push('/newOrder')}
            >Create New Work Order</Button>
          </Grid>
          {user.role < 3 && <Grid item xs={11} md={6}>
            <WorkOrdersTable
              heading={user.role === 1 ? 'Work Orders to Assign' : 'Work Orders To Review'}
              workOrders={filteredOrders}
              description={user.role === 1 ? 'New Work Orders that need to be assigned to maintenance': 'New Work Orders that need to be reviewed by maintenance'}
            />
          </Grid>}

          <Grid item xs={11} md={6}>
            <WorkOrdersTable
              heading='Current Work Orders'
              description={user.role === 3? 'Only work orders for properties that you are assigned to will be visible':
            user.role === 2 ? 'This shows all work orders that are assigned to you but status is not Complete':'This shows all work orders assigned to maintenance in which the status is not Complete'}
              workOrders={filteredOrders2}
            />
          </Grid>

          <Grid item xs={11} md={6}>
            <WorkOrdersTable
              heading='Completed Work Orders'
              description={user.role === 3? 'Only work orders for properties that you are assigned to will be visible':
            user.role === 2 ? 'This shows all completed work orders that are assigned to you':'This shows all completed work orders'}
              workOrders={this.props.completedWorkOrders}
              completed={true}
            />
          </Grid>

        </Grid>
    );
  }
}
const mapStateToProps = (state) => ({ user: state.user, workOrders: state.workOrders, completedWorkOrders: state.completedWorkOrders })

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withRouter(UserPage));
