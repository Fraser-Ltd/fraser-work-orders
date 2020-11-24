import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';


//custom components
import WorkOrderDetailForm from './WorkOrderDetailForm';









class WorkOrderDetails extends Component {
    state = {
        enter: false,
        home: false,
        hanger: false,
        status: '',
    }
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_UNITS' });
        this.props.dispatch({ type: 'FETCH_WORKORDERS' });
        this.props.dispatch({ type: 'FETCH_PROPERTY' });
        this.props.dispatch({ type: 'GET_USERS' });

    }





    render() {
        const id = this.props.match.params.id
        const workOrder = this.props.workOrders[0] != undefined ? this.props.workOrders.filter(order => order.id === Number(id))[0] : null;
        const property = workOrder != null && this.props.properties[0] && this.props.properties.filter(prop => prop.id === workOrder.property_id)[0] || null;
        const unit = workOrder != null && this.props.units[0] && this.props.units.filter(unit => unit.id === workOrder.unit_id)[0] || null;
        const assignedTo = workOrder != null && this.props.allUsers[0] && this.props.allUsers.filter(user => user.id === workOrder.assigned_to)[0] || {first_name: '',last_name:''};
        const addedBy = workOrder != null && this.props.allUsers[0] && this.props.allUsers.filter(user => user.id === workOrder.added_by_id)[0];
        console.log('property is:', property);
        console.log('workOrder is:', workOrder);
        console.log('unit is:', unit);
        console.log('added by is:', addedBy);
        console.log('assigned to is:', assignedTo);
        console.log('this props is', this.props)
        return (
            <>
            {workOrder && property && unit && assignedTo && addedBy && 
            <WorkOrderDetailForm
                workOrder={workOrder}
                property={property}
                unit={unit}
                assignedTo={assignedTo}
                addedBy={addedBy}
                allUsers={this.props.allUsers}
             />}
            </>
        );
    }

}
const mapStateToProps = (state) => ({
    user: state.user,
    allUsers: state.allUsers,
    properties: state.properties,
    workOrders: state.workOrders,
    units: state.units
});

export default connect(mapStateToProps)(withRouter(WorkOrderDetails));