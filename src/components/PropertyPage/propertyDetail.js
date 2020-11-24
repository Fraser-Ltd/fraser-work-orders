import React, { Component } from 'react';
import { connect } from 'react-redux';


class propertyDetail extends Component {

    state = {
        property_name: '',
        property_address: '',
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        this.props.dispatch({
            type: "ADD_PROPERTY",
            payload: this.state
        })
        this.setState({
            property_name: '',
            property_address: '',
        });
    }

    render() {
        return (
            <>
                <div>
                    <p>Add A New Property</p>
                </div>
                <div><form onSubmit={this.handleSubmit}>
                    <input name='property_name' type='text' value={this.state.property_name} onChange={this.handleChange} placeholder='Property Name' />
                    <input name='property_address' type='text' value={this.state.property_address} onChange={this.handleChange} placeholder='Property Address' />
                    <button type="submit">Submit Item</button>
                </form>
                </div>
            </>
        )
    };
}

export default connect()(propertyDetail);
