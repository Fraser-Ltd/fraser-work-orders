import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class property extends Component {

    componentDidMount = () => {
        this.props.dispatch({ type: "FETCH_PROPERTY"});
    };

  render() {
    return (
      <div>
        <h1> Properties</h1>
        <h2>Current Properties</h2>
        <table>
            <th>Name</th>
            <th>Address</th>
            <th>Details</th>
        </table>

      </div>
    );
  }
}


export default connect(mapStoreToProps)(property);