import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

import './LandingPage.css';

// CUSTOM COMPONENTS
import LoginForm from '../LoginForm/LoginForm';

class LandingPage extends Component {


  onLogin = (event) => {
    this.props.history.push('/login');
  };

  render() {
    return (
      <div className="container">

        <div className="grid">
          
          <div className="grid-col grid-col_12">
            <LoginForm />


          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStoreToProps)(LandingPage);
