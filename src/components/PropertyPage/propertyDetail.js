import React, { Component } from 'react';
import { connect } from 'react-redux';


class propertyDetail extends Component {

    state = {
        propertyName: '',
        propertyAddress: '',
        residentCoordinator: '',
    }

    saveChanges = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'EDIT_PROPERTY',
            payload: {
                propertyName: this.state.property_name,
                propertyAddress: this.state.property_address,
                resCoordinator: this.state.resident_coordinator,
            }
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
        });
    }

    render() {
        return (
            <>
                <div>
                    <p>Add A New Property</p>
                </div>
                <div><form onSubmit={this.handleSubmit}>
                    <input name='propertyName' type='text' value={this.state.propertyName} onChange={this.handleChange} placeholder='Property Name' />
                    <input name='propertyAddress' type='text' value={this.state.propertyAddress} onChange={this.handleChange} placeholder='Property Address' />
                    <input name='residentCoordinator' type='text' value={this.state.residentCoordinator} onChange={this.handleChange} placeholder='1' />
                    <button onClick={this.handleSubmit} type="submit">Add New Property</button>
                    {this.props.edit && <button onClick={this.saveChanges}>Save Changes</button>}
                </form></div>
            </>
        )
    };
}

export default connect()(propertyDetail);
