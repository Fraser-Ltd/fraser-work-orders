import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//pages to bring in
import InfoItem from './InfoItem';
import PasswordItem from './PasswordItem';
import './InfoPage.css'

//material ui imports
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  title: {
      marginTop: 30,
  },
  h4: {
      marginLeft: 60,
  },
  h5: {
      marginLeft: 78,
  },
  headCaption: {
      marginLeft: 115,
      marginRight: 70,
  },
  caption: {
      marginLeft: 124,
      marginRight: 70,
  },
  textIndent: {
      marginLeft: 159,
      marginRight: 70,
  },
  textIndent1: {
      marginLeft: 180,
      marginRight: 70,
  },
  textIndent2: {
      marginLeft: 200,
      marginRight: 70,
  },

})


class UserProfile extends Component {
  state = {
    edit: false,
    editPassword: false,
    showUserInfo: true
  };

  editUser = () => {
    this.setState({ edit: true, showUserInfo: false })
  }

  clearEdit = () => {
    this.setState({ edit: false, showUserInfo: true })
  }

  editPassword = () => {
    this.setState({ editPassword: true, showUserInfo: false })
  }

  clearPassword = () => {
    this.setState({ editPassword: false, showUserInfo: true })
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'FETCH_USER'
    })
  }

  render() {
    console.log(this.props)
    const user1 = this.props.user
    return (
      <>
        <div className="userProfile">
        <Grid container justify="center">
          <Paper>
            {this.state.showUserInfo && <><h1>{this.props.user.first_name}'s Profile</h1>
              <div className="Profile-details">
                <h3><strong>Username:</strong> {this.props.user.username}</h3>
                <h3><strong>Name:</strong> {this.props.user.first_name} {this.props.user.last_name}</h3>
                <h3><strong>Email:</strong> {this.props.user.email}</h3>
                <br></br>
              </div>
              <Button style={{ margin: 10 }} color="primary" variant="contained" onClick={this.editUser}>Edit Profile</Button>
              <Button style={{ margin: 10 }} color="primary" variant="contained" onClick={this.editPassword}>Change Password</Button></>}
          </Paper>
          </Grid>
          {this.state.edit && this.props.user.id && !this.state.editPassword && <InfoItem clearEdit={this.clearEdit} user={user1} username={this.props.user.username} />}
          {this.state.editPassword && this.props.user.id && !this.state.edit && <PasswordItem clearEdit={this.clearPassword} user={user1} username={this.props.user.username} />}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(mapStateToProps)(withRouter(withStyles(styles, { withTheme: true })(UserProfile)));