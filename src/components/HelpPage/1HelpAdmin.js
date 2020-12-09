import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//material ui imports
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, withStyles } from '@material-ui/core';


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

class HelpAdmin extends Component {
    render() {
        const {classes} = this.props;
        return (
            <>
                <Grid
                    container
                    justify="center"
                    spacing={0}
                >
                    <Grid item xs={10}>
                        <Paper>
                            <Grid
                                container
                                justify="center"
                                spacing={0}
                            >
                                <Grid item xs={10} style={{ textAlign: 'center' }}>
                                    <Typography className={classes.title} variant='h2'>Fraser MMS</Typography>
                                    <Typography variant='h4'>(Maintenance Management System)</Typography> <br />
                                    <Typography variant='h3'>Admin Help Page</Typography>
                                    <Typography variant='caption'>These are instructions for Administration only</Typography> <br />
                                    <Typography variant='caption'>* signifies pages only accessible by Admin</Typography>
                                </Grid>
                            </Grid>
                            <br />
                            <Typography  className={classes.h4} variant='h4'>1.0 Application Overview</Typography>
                            <Typography className={classes.headCaption} variant='body2'>The Fraser MMS application is a custom-built web-based solution to Fraser, LTD’s ongoing maintenance management system.  This will streamline communication between Resident Coordinators, the Director of Program Operations, and the maintenance staff with a goal to eliminate paperwork, add visibility, and simplify the work order process.</Typography>
                            <br /> <br />
                            <Typography className={classes.h4} variant='h4'>2.0 Important Information</Typography>
                            <Typography className={classes.headCaption} variant='body2'>For trouble-free operation of the MMS, please read and understand all instructions before use.</Typography>
                            <br /> <br />
                            <Typography className={classes.h4} variant='h4'>3.0 Getting Started</Typography> <br />
                            <Typography className={classes.h5} variant='h5'>3.1 Users</Typography>
                            <Typography className={classes.caption} variant='body2'>3.1.1 Setting up a new User</Typography> <br />
                            <Typography className={classes.textIndent} variant='body2'>The Admin must add all applicable users before the MMS can be used.  Please see step 4.2.2 for instructions on adding Users.</Typography> <br /><br />

                            <Typography className={classes.h5} variant='h5'>3.2 Properties</Typography>
                            <Typography className={classes.caption} variant='body2'>3.2.1 Setting up Properties</Typography>
                            <Typography className={classes.textIndent} variant='body2'>The Admin must add all applicable Properties before the MMS can be used. Please see step 4.3.2 for instructions on adding Properties.</Typography>
                            <br /> <br />
                            <Typography  className={classes.h4}variant='h4'>4.0 Operation</Typography> <br />
                            <Typography className={classes.h5} variant='h5'>4.1 Work Orders</Typography>
                            <Typography className={classes.headCaption} variant='body2'>Once logged in, all users will be automatically directed to the Work Orders Page.  Note this page will look different depending on the User Role.</Typography> <br /><br />
                            <Typography className={classes.caption} variant='body2'>4.1.1 Work Orders to Assign</Typography>
                            <Typography className={classes.textIndent} variant='body2'>All work orders that are created will first appear in the 'Work Orders to Assign' table.  This is a high level view.  To see more details and to assign to Maintenance, simply click anywhere in the row of the applicable work order.  Now 'Work Orders Details' table will open.  Here the Admin can change the status of the work order. If for example, assigning the work order to Maintenance; the admin will change the Status to 'Assigned To Maintenance', assign the appropriate Maintenance staff and provide a priority.  Note there are three priority options, High, Low and No Priority.</Typography> <br /><br />
                            <Typography className={classes.caption} variant='body2'>4.1.2 Current Work Orders</Typography>
                            <Typography className={classes.textIndent} variant='body2'>Open Work Orders that have been Assigned to Maintenance will show here.  Admin may click on and edit work orders in this table if necessary.</Typography> <br /><br />
                            <Typography className={classes.caption} variant='body2'>4.1.3 Completed Work Orders</Typography>
                            <Typography className={classes.textIndent} variant='body2'>Work orders that are complete will show up here.</Typography> <br /><br />
                            <Typography className={classes.caption} variant='body2'>4.1.4 Create New Work Order</Typography>
                            <Typography className={classes.textIndent} variant='body2'>Clicking on the “CREATE NEW WORK ORDER” button on the Work Orders page will direct the user to the “Add New Work Order” form.  The form contains the following fields:</Typography> <br />
                            <Typography className={classes.textIndent1} variant='body2'>- Property:  This is a drop down with all available properties*.  Choose the applicable property.  If the property has units associated with it, another drop down will appear for the user to select the applicable unit.  If a property or unit is not available, see step 4.3.2.</Typography> <br />
                            <Typography className={classes.textIndent1} variant='body2'>- Order Type: This field is defaulted to Non-Emergency, if the work order is an Emergency, simply select “Emergency” from the drop down.</Typography> <br />
                            <Typography className={classes.textIndent1} variant='body2'>- “Permission to Enter”, “Tenant Not Home”, and “Work needed as a result of REAC Inspection or QMR Inspection” are boxes that can be clicked if applicable.</Typography> <br />
                            <Typography className={classes.textIndent1} variant='body2'>- Work To Be Done:  This is where the user can provide a detailed description of the issue needing to be addressed.  Keep in mind it is helpful to be specific, examples:</Typography> <br />
                            <Typography className={classes.textIndent2} variant='body2'>- Instead of “light needs to be fixed”, address which light: “light in bathroom needs to be changed”.</Typography> <br />
                            <Typography className={classes.textIndent2} variant='body2'>- Instead of “issues with sink”, be more specific: “sink in kitchen is leaking”.</Typography>
                            <br />
                            <Typography className={classes.textIndent} variant='body2'>Once all required fields are populated on the form the user can then submit the work order.  If not all required fields are populated, an error will pop up showing the user which required fields remain.</Typography> <br /><br />
                            <br />
                            <Typography className={classes.h5} variant='h5'>4.2 Users*</Typography>
                            <Typography className={classes.caption} variant='body2'>4.2.1 Current Users</Typography>
                            <Typography className={classes.textIndent} variant='body2'>Any active user already added to the system will show up under the 'Current User' table.  Admin is able to edit users by clicking anywhere in the row of the user they wish to edit.  Should a user request a password change, click on the applicable user. Under the Edit User table, a password field will show.  Populate the field and click the 'Update' button to save changes. Notify the user of the changed password.</Typography> <br /><br />
                            <Typography className={classes.caption} variant='body2'>4.2.2 Add New User</Typography>
                            <Typography className={classes.textIndent} variant='body2'>To add a New User, scroll to the 'Add New User' table.  All fields are required and must be populated before selecting the 'Add New User' button. Be sure to select the correct Role from the dropdown as this will impact what is viewable by the user. Notify the new user of their username and password. Note, users will be able to change their user details as well as their password.</Typography> <br /><br />
                            <Typography className={classes.caption} variant='body2'>4.2.3 Inactive Employees</Typography>
                            <Typography className={classes.textIndent} variant='body2'>If a user is no longer with the company or for any reason no longer needs access to the MMS, Admin may remove them by clicking on the applicable user in the 'Current Users' table and selecting 'Removed' from the dropdown on the 'Employee Status' field.  It is important to note once a user is removed, they will no longer be able to access the MSS.</Typography> <br /><br />

                            <Typography className={classes.h5} variant='h5'>4.3 Properties*</Typography>
                            <Typography className={classes.caption} variant='body2'>4.3.1 Current Properties</Typography>
                            <Typography className={classes.textIndent} variant='body2'>Properties already added to the system will show up under the 'Current Properties' table.  Admin is able to edit Properties by clicking anywhere in the row of the Property they wish to edit.</Typography> <br /><br />
                            <Typography className={classes.caption} variant='body2'>4.3.2 Add Properties</Typography>
                            <Typography className={classes.textIndent} variant='body2'>To add a New Property, scroll to the 'Add Property' table.  All fields are required and must be populated before selecting the 'Add New Property' button. Admins are also able to add additional units by clicking on the applicable Property.</Typography>
                            <br /> <br />
                            <Typography className={classes.h5} variant='h5'>4.4 Reports*</Typography>
                            <Typography className={classes.caption} variant='body2'>4.4.1 Completed Work Orders Report</Typography>
                            <Typography className={classes.textIndent} variant='body2'>Admin are able to view previous work orders by selecting 'Reports' in the Navigation bar on top.  Once there, the admin can select the Maintenance Staff and a time frame they wish to view closed Work Orders.</Typography>
                            <br /> <br />
                        </Paper>
                    </Grid>
                </Grid>
                <br /> <br />
            </>
        );
    }

}

export default connect()(withStyles(styles, {withTheme:true})(withRouter(HelpAdmin)));