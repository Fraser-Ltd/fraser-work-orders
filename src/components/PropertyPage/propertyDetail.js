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
        unit: this.props.units.unit
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_PROPERTY'
        })
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
                unit: this.props.units.unit
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
            unit: ''
        });
    }

    render() {
        console.log('property detail props', this.props)
        console.log('this.state', this.state)
        return (
            <>
                <div>
                    <p>{this.props.heading}</p>
                </div>

                <div><form onSubmit={this.handleSubmit}>

                    <input name='propertyName' type='text' value={this.state.propertyName} onChange={this.handleChange} placeholder='Property Name' />
                    <input name='propertyAddress' type='text' value={this.state.propertyAddress} onChange={this.handleChange} placeholder='Property Address' />

                    
                    {this.props.units[0] && <select name='unit' id='unit' onChange={this.handleChange} placeholder="unit">
                        {this.props.units.filter(unit => unit.property_id === 1).map(unit => <option value={unit.unit}>{unit.unit}</option>)}
                    </select>}

                    {this.props.users[0] && <select name='residentCoordinator' id='Resident Coordinator' value={this.state.residentCoordinator} onChange={this.handleChange} placeholder="Resident Coordinator">
                        {this.props.users.filter(user => user.role !== 2).map(user => <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>)}
                    </select>}

                    {!this.props.edit && <button onClick={this.handleSubmit} type="submit">Add New Property</button>}
                    {this.props.edit && <div><button onClick={this.saveChanges}>Save Changes</button><button onClick={this.deleteProperty}>Delete property</button></div>}
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
