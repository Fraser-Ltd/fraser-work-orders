import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import HelpAdmin from './1HelpAdmin';
import HelpMaint from './2HelpMaint';
import HelpRC from './3HelpRC';

//material ui imports
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  input: {
    marginTop: 5,
    marginBottom: 5
  },
})

class UserPage extends Component {
  componentDidMount() {
    this.props.dispatch({ type: 'GET_USERS' });
  }

  render() {
    const { user } = this.props;

    return (
      <Grid container justify="center">
        {user.role === 3 && <Grid>
          <HelpRC />
        </Grid>}

        <Grid>
          {user.role === 2 && <Grid>
            <HelpMaint />
          </Grid>}
        </Grid>

        <Grid>
          {user.role === 1 && <Grid>
            <HelpAdmin />
          </Grid>}
        </Grid>

        {this.props.user.id === undefined && <Grid item xs={11} sm={6} md={5} lg={4} style={{ textAlign: 'center' }} >
          <Grid container justify="center">
            <Paper>
              <Typography variant='h2'>Login Help</Typography>
              <Typography variant='body1'>If you do not have a username and password or you have forgotten your password, please contact your Administrator.</Typography>
            </Paper>
          </Grid>
        </Grid>}

      </Grid>
    );
  }
}
const mapStateToProps = (state) => ({ user: state.user })

export default connect(mapStateToProps)(withRouter(withStyles(styles, { withTheme: true })(UserPage)));