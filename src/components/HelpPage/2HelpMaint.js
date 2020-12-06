import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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

class HelpMaint extends Component {
    render() {
        return (
            <>
            <Grid
                container
                justify="center"
                spacing={0}
            >

                <Paper>
                    <Grid item xs={11} style={{ textAlign: 'center' }}>
                        <Typography variant='h2'>Maintenance Help Page</Typography>
                        <Typography variant='caption'>These are instructions for Maintenance only</Typography>
                    </Grid>
                    <Typography variant='h5'>(Fill out specific information and hit 'Submit')</Typography>
                </Paper>
            </Grid>
        </>
        );
    }

}

export default connect()(withRouter(HelpMaint));