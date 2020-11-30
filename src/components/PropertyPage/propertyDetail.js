import React, { Component } from 'react';
import { connect } from 'react-redux';




class propertyDetail extends Component {

    state = {
        propertyName: this.props.properties.propertyName,
        propertyAddress: this.props.properties.propertyAddress,
        residentCoordinator: this.props.properties.residentCoordinator,
        id: this.props.properties.id,
        unit: ''
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
        return (
            <>
                <div>
                    <p>Add A New Property</p>
                </div>
                <div><form onSubmit={this.handleSubmit}>
                    <input name='propertyName' type='text' value={this.state.propertyName} onChange={this.handleChange} placeholder='Property Name' />
                    <input name='propertyAddress' type='text' value={this.state.propertyAddress} onChange={this.handleChange} placeholder='Property Address' />
                    <select name='Unit' id='unit' onChange={this.handleChange} placeholder="unit">
                        <option value={this.state.unit}>Apt 101</option>
                        <option value={this.state.unit}>Apt 102</option>
                        <option value={this.state.unit}>Apt 103</option>
                    </select>
                    <select name='residentCoordinator' id='Resident Coordinator' onChange={this.handleChange} placeholder="Resident Coordinator">
                        <option value='1'>Patty Kalibabky</option>
                        <option value='3'>Jeff McMahon</option>
                        <option value='4'>Andrew McMahon</option>
                    </select>
                    {!this.props.edit && <button onClick={this.handleSubmit} type="submit">Add New Property</button>}
                    {this.props.edit && <button onClick={this.saveChanges}>Save Changes</button>}
                </form></div>
            </>
        )
    };
}

export default connect()(propertyDetail);
