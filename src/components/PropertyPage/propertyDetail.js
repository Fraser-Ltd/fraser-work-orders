import React, { Component } from 'react';
import { connect } from 'react-redux';

import UnitElement from './PropertyCoordinator';




class propertyDetail extends Component {

    // Sets local state for the propertyDetail component

    state = {
        propertyName: this.props.properties.propertyName,
        propertyAddress: this.props.properties.propertyAddress,
        residentCoordinator: this.props.properties.residentCoordinator,
        id: this.props.properties.id,
        unit: ''
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_USERS'
        })
        console.log(this.props)
    }


    saveChanges = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'EDIT_PROPERTY',
            payload: this.state
        })
        this.props.clearEditProperty();
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
            unit: ''
        });
    }

    render() {
        console.log('property detail props', this.props)
        return (
            <>
                <div>
                    <p>{this.props.heading}</p>
                </div>

                <div><form onSubmit={this.handleSubmit}>
                    <input name='propertyName' type='text' value={this.state.propertyName} onChange={this.handleChange} placeholder='Property Name' />
                    <input name='propertyAddress' type='text' value={this.state.propertyAddress} onChange={this.handleChange} placeholder='Property Address' />
                    <select name='unit' id='unit' onChange={this.handleChange} placeholder="unit">
                        {this.props.units[0] && this.props.unit.filter(unit => unit.property_id === 1).map(unit => <option value={unit.unit}>{unit.unit}</option>)}

                    </select>
                    <select name='residentCoordinator' id='Resident Coordinator' onChange={this.handleChange} placeholder="Resident Coordinator">
                        {this.props.users[0] &&
                            this.props.users.filter(user => user.role === 1).map(user => <option value={user.id}>{user.first_name} {user.last_name}</option>)}
                    </select>
                    {!this.props.edit && <button onClick={this.handleSubmit} type="submit">Add New Property</button>}
                    {this.props.edit && <button onClick={this.saveChanges}>Save Changes</button>}
                </form></div>
            </>
        )
    };
}

const mapStoreToProps = (store) => ({
    users: store.allUsers,
    units: store.units
})

export default connect(mapStoreToProps)(propertyDetail);
