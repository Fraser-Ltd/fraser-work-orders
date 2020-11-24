import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import InfoItem from './InfoItem';
import PasswordItem from './PasswordItem';

class UserProfile extends Component {
  state = {
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
  };

  componentDidMount() {
    this.props.dispatch({
      type: 'GET_USERS'
    })
  }

  render() {
    return (
      <div>
        <h1>{this.props.user.first_name}'s Profile</h1>
        <h3>Username: {this.props.user.username}</h3>
        <h3>Name: {this.props.user.first_name} {this.props.user.last_name}</h3>
        <h3>Email: {this.props.user.email}</h3>
          <InfoItem key={this.props.user.id} username={this.props.user.username} />
          <PasswordItem key={this.props.user.id} username={this.props.user.username} />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(mapStateToProps)(withRouter(UserProfile));
