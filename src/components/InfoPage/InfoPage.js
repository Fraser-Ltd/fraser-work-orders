import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//pages to bring in
import InfoItem from './InfoItem';
import PasswordItem from './PasswordItem';

//material ui imports
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { object, ref, string } from 'yup'

class UserProfile extends Component {
  state = {
   edit: false
  };

  editUser = () => {
    this.setState({edit: true})
  }

  clearEdit = () => {
    this.setState({edit: false})
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_USER'
    })
  }

  render() {
    console.log(this.props)
    const user1=this.props.user
    return (
      <div>
        {!this.state.edit && <><h1>{this.props.user.first_name}'s Profile</h1>
        <h3>Username: {this.props.user.username}</h3>
        <h3>Name: {this.props.user.first_name} {this.props.user.last_name}</h3>
        <h3>Email: {this.props.user.email}</h3>
        <button onClick={this.editUser}>Edit Profile</button></>}
        {this.state.edit && this.props.user.id && <InfoItem clearEdit = {this.clearEdit} user={user1} username={this.props.user.username} />}
        
        <button onClick={this.editUser}>Change Password</button>
        {this.state.edit && this.props.user.id && <PasswordItem clearEdit = {this.clearEdit} user={user1} username={this.props.user.username} />}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(mapStateToProps)(withRouter(UserProfile));
