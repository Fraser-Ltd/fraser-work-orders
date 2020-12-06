import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//material ui imports
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, withStyles } from '@material-ui/core';

class HelpAdmin extends Component {
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
                            <Typography variant='h2'>Admin Help Page</Typography>
                            <Typography variant='caption'>These are instructions for Administration only</Typography>
                        </Grid>
                        <Typography variant='h4'>1.0 Application Overview</Typography>
                        <Typography variant='caption'>The Fraser MMS application is a custom-built web-based solution to Fraser, LTD’s ongoing maintenance management system.  This will streamline communication between Resident Coordinators, the Director of Program Operations, and the maintenance staff with a goal to eliminate paperwork, add visibility, and simplify the work order process.</Typography>
                        
                        <Typography variant='h4'>2.0 Important Information</Typography>
                        <Typography variant='caption'>For trouble-free operation of the MMS, please read and understand all instructions before use.</Typography>
                        
                        <Typography variant='h4'>3.0 Setup</Typography>

                        <Typography variant='h4'>4.0 Operation</Typography>
                        <Typography variant='h5'>4.1 Work Orders</Typography>
                        <Typography variant='caption'>4.1.1 Work Orders to Assign</Typography> <br />
                        <Typography variant='caption'>4.1.2 Current Work Orders</Typography> <br />
                        <Typography variant='caption'>4.1.3 Completed Work Orders</Typography> <br />
                        <Typography variant='caption'>4.1.4 Create New Work Order</Typography> <br />

                        <Typography variant='h5'>4.2 Users</Typography>
                        <Typography variant='caption'>4.2.1 Current Users</Typography>  <br />
                        <Typography variant='caption'>4.2.2 Add New User</Typography>  <br />

                        <Typography variant='h5'>4.3 Properties</Typography>
                        <Typography variant='caption'>4.3.1 Current Properties</Typography>  <br />
                        <Typography variant='caption'>4.3.2 Add Properties</Typography>  <br />

                        <Typography variant='h5'>4.4 Reports</Typography>
                        <Typography variant='caption'>4.4.1 Completed Work Orders Report</Typography>  <br />
                    </Paper>
                </Grid>
            </>
        );
    }

}

export default connect()(withRouter(HelpAdmin));