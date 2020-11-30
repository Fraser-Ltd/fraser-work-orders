import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//pages to bring in
import InfoItem from './InfoItem';
import PasswordItem from './PasswordItem';
import './InfoPage.css'

//material ui imports
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  center: {
      [theme.breakpoints.down('sm')]: {
          textAlign: 'center'
      },
      [theme.breakpoints.up('md')]: {
          textAlign: 'right'
      }
  },
})


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

  editPassword = () => {
    this.setState({edit: true})
  }

  clearPassword = () => {
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
    const user2=this.props.user
    return (
      <div className="userProfile">
        
        {!this.state.edit && <><h1>{this.props.user.first_name}'s Profile</h1>
        <h3>Username: {this.props.user.username}</h3>
        <h3>Name: {this.props.user.first_name} {this.props.user.last_name}</h3>
        <h3>Email: {this.props.user.email}</h3>
        <br></br>
        <Button color="primary" variant="contained" onClick={this.editUser}>Edit Profile</Button></>}
        {this.state.edit && this.props.user.id && <InfoItem clearEdit = {this.clearEdit} user={user1} username={this.props.user.username} />}
        <>  </>
        <Button color="primary" variant="contained" onClick={this.editPassword}>Change Password</Button>
        {this.state.edit && this.props.user.id && <PasswordItem clearEdit = {this.clearEdit} user={user2} username={this.props.user.username} />}

      </div>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(mapStateToProps)(withRouter(withStyles(styles, { withTheme: true })(UserProfile)));