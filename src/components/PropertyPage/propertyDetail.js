import React, { Component } from 'react';
import { connect } from 'react-redux';


class propertyDetail extends Component {

    state = {
        propertyName: '',
        propertyAddress: '',
        residentCoordinator: '',
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
                    <button type="submit">Submit Item</button>
                </form></div>
            </>
        )
    };
}

export default connect()(propertyDetail);
