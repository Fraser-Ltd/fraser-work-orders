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
                            <Typography variant='h2'>Fraser MMS</Typography>
                            <Typography variant='h4'>(Maintenance Management System)</Typography> <br />
                            <Typography variant='h3'>Admin Help Page</Typography>
                            <Typography variant='caption'>These are instructions for Administration only</Typography>
                        </Grid>
                        <br />
                        <Typography variant='h4'>1.0 Application Overview</Typography>
                        <Typography variant='caption'>The Fraser MMS application is a custom-built web-based solution to Fraser, LTD’s ongoing maintenance management system.  This will streamline communication between Resident Coordinators, the Director of Program Operations, and the maintenance staff with a goal to eliminate paperwork, add visibility, and simplify the work order process.</Typography>
                        <br /> <br />
                        <Typography variant='h4'>2.0 Important Information</Typography>
                        <Typography variant='caption'>For trouble-free operation of the MMS, please read and understand all instructions before use.</Typography>
                        <br /> <br />
                        <Typography variant='h4'>3.0 Getting Started</Typography>
                        <Typography variant='h5'>3.1 Users</Typography>
                        <Typography variant='caption'>3.1.1 Setting up a new User</Typography> <br />
                        <Typography variant='caption'>The Admin must add all applicable users before the MMS can be used.  Please see step 4.2.2 for instructions on adding Users.</Typography> <br /><br />

                        <Typography variant='h5'>3.2 Properties</Typography>
                        <Typography variant='caption'>3.2.1 Setting up Properties</Typography> <br />
                        <Typography variant='caption'>The Admin must add all applicable Properties before the MMS can be used. Please see step 4.3.2 for instructions on adding Properties.</Typography>
                        <br /> <br />
                        <Typography variant='h4'>4.0 Operation</Typography>
                        <Typography variant='h5'>4.1 Work Orders</Typography>
                        <Typography variant='caption'>4.1.1 Work Orders to Assign</Typography> <br />
                        <Typography variant='caption'>4.1.2 Current Work Orders</Typography> <br />
                        <Typography variant='caption'>4.1.3 Completed Work Orders</Typography> <br />
                        <Typography variant='caption'>4.1.4 Create New Work Order</Typography> <br />
                        <br />
                        <Typography variant='h5'>4.2 Users*</Typography>
                        <Typography variant='caption'>4.2.1 Current Users</Typography>  <br />
                        <Typography variant='caption'>Any active user already added to the system will show up under the 'Current User' table.  Admin is able to edit users by clicking anywhere in the row of the user they wish to edit.  Should a user request a password change, click on the applicable user. Under the Edit User table, a password field will show.  Populate the field and click the 'Update' button to save changes. Notify the user of the changed password.</Typography> <br /><br />
                        <Typography variant='caption'>4.2.2 Add New User</Typography>  <br />
                        <Typography variant='caption'>To add a New User, scroll to the 'Add New User' table.  All fields are required and must be populated before selecting the 'Add New User' button. Be sure to select the correct Role from the dropdown as this will impact what is viewable by the user. Notify the new user of their username and password. Note, users will be able to change their user details as well as their password.</Typography> <br /><br />
                        <Typography variant='caption'>4.2.3 Inactive Employees</Typography>  <br />
                        <Typography variant='caption'>If a user is no longer with the company or for any reason no longer needs access to the MMS, Admin may remove them by clicking on the applicable user in the 'Current Users' table and selecting 'Removed' from the dropdown on the 'Employee Status' field.  It is important to note once a user is removed, they will no longer be able to access the MSS.</Typography> <br /><br />

                        <Typography variant='h5'>4.3 Properties*</Typography>
                        <Typography variant='caption'>4.3.1 Current Properties</Typography>  <br />
                        <Typography variant='caption'>Properties already added to the system will show up under the 'Current Properties' table.  Admin is able to edit Properties by clicking anywhere in the row of the Property they wish to edit.</Typography> <br /><br />
                        <Typography variant='caption'>4.3.2 Add Properties</Typography>  <br />
                        <Typography variant='caption'>To add a New Property, scroll to the 'Add Property' table.  All fields are required and must be populated before selecting the 'Add New Property' button.</Typography> <br /><br />
                        <br />
                        <Typography variant='h5'>4.4 Reports*</Typography>
                        <Typography variant='caption'>4.4.1 Completed Work Orders Report</Typography>  <br />

                        <Typography variant='h5'>* signifies pages only accessible by Admin</Typography>
                    </Paper>
                </Grid>
            </>
        );
    }

}

export default connect()(withRouter(HelpAdmin));