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

class HelpRC extends Component {
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
                            <Typography variant='h2'>Fraser MMS</Typography>
                            <Typography variant='h4'>(Maintenance Management System)</Typography> <br />
                            <Typography variant='h3'>Resident Coordinator Help Page</Typography>
                            <Typography variant='caption'>These are instructions for Resident Coordinators only</Typography>
                        </Grid>
                        <br />
                    <Typography variant='h4'>1.0 Application Overview</Typography>
                        <Typography variant='caption'>The Fraser MMS application is a custom-built web-based solution to Fraser, LTD’s ongoing maintenance management system.  This will streamline communication between Resident Coordinators, the Director of Program Operations, and the maintenance staff with a goal to eliminate paperwork, add visibility, and simplify the work order process.</Typography>
                        
                        <Typography variant='h4'>2.0 Important Information</Typography>
                        <Typography variant='caption'>For trouble-free operation of the MMS, please read and understand all instructions before use.</Typography>

                        <Typography variant='h4'>3.0 Operation</Typography>
                        <Typography variant='h5'>3.1 Work Orders</Typography>
                        <Typography variant='caption'>3.1.1 Current Work Orders</Typography> <br />
                        <Typography variant='caption'>3.1.3 Completed Work Orders</Typography> <br />
                        <Typography variant='caption'>3.1.4 Create New Work Order</Typography> <br />

                        <Typography variant='h5'>3.2 Profile</Typography>
                        <Typography variant='caption'>3.2.1 Your Profile</Typography>  <br />
                        <Typography variant='caption'>3.2.2 Edit Profile</Typography>  <br />
                        <Typography variant='caption'>3.2.3 Change Password</Typography>  <br />
                </Paper>
            </Grid>
        </>
        );
    }

}

export default connect()(withRouter(HelpRC));