import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//material ui imports
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography, withStyles } from '@material-ui/core';


const styles = theme => ({
    h4: {
        marginLeft: 10,
    },
    headCaption: {
        marginLeft: 65,
        marginRight: 65,
    },
    h5: {
        marginLeft: 65,
    },
    caption: {
        marginLeft: 105,
        marginRight: 85,
    },
    textIndent: {
        marginLeft: 137,
        marginRight: 70,
    },
    textIndent1: {
        marginLeft: 150,
        marginRight: 70,
    },
    textIndent2: {
        marginLeft: 190,
        marginRight: 70,
    },

})

class HelpRC extends Component {
    render() {
        const { classes } = this.props;
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
                                    <Typography variant='h2'>Fraser MMS</Typography>
                                    <Typography variant='h4'>(Maintenance Management System)</Typography> <br />
                                    <Typography variant='h3'>Resident Coordinator Help Page</Typography>
                                    <Typography variant='caption'>These are instructions for Resident Coordinators only</Typography>
                                </Grid>
                            </Grid>
                            <br />
                            <Typography className={classes.h4} variant='h4'>1.0 Application Overview</Typography>
                            <Typography className={classes.headCaption} variant='body2'>The Fraser MMS application is a custom-built web-based solution to Fraser, LTD’s ongoing maintenance management system.  This will streamline communication between Resident Coordinators, the Director of Program Operations, and the maintenance staff with a goal to eliminate paperwork, add visibility, and simplify the work order process.</Typography>
                            <br /> <br />
                            <Typography className={classes.h4} variant='h4'>2.0 Important Information</Typography>
                            <Typography className={classes.headCaption} variant='body2'>For trouble-free operation of the MMS, please read and understand all instructions before use.</Typography>
                            <br /> <br />
                            <Typography  className={classes.h4} variant='h4'>3.0 Operation</Typography>
                            <Typography className={classes.h5} variant='h5'>3.1 Work Orders</Typography>
                            <Typography className={classes.headCaption} variant='body2'>Once logged in, all users will be automatically directed to the Work Orders Page.  Note this page will look different depending on the User Role.</Typography> <br />
                            <Typography  className={classes.caption} variant='body2'>3.1.1 Current Work Orders</Typography>
                            <Typography className={classes.textIndent} variant='body2'>All open work orders will show here along with their status of compeltion.  Resident Coordinators may click on and edit work orders in this table if necessary.</Typography> <br />
                            <Typography className={classes.caption} variant='body2'>3.1.3 Completed Work Orders</Typography>
                            <Typography className={classes.textIndent} variant='body2'>Work orders that are complete will show up here.</Typography> <br />
                            <Typography className={classes.caption} variant='body2'>3.1.4 Create New Work Order</Typography>
                            <Typography className={classes.textIndent} variant='body2'>Clicking on the “CREATE NEW WORK ORDER” button on the Work Orders page will direct the user to the “Add New Work Order” form.  The form contains the following fields:</Typography> <br />
                            <Typography className={classes.textIndent1} variant='body2'>- Property:  This is a drop down with all available properties*.  Choose the applicable property.  If the property has units associated with it, another drop down will appear for the user to select the applicable unit.  If a property or unit is not available, see step 4.3.2.</Typography> <br />
                            <Typography className={classes.textIndent1} variant='body2'>- Order Type: This field is defaulted to Non-Emergency, if the work order is an Emergency, simply select “Emergency” from the drop down.</Typography> <br />
                            <Typography className={classes.textIndent1} variant='body2'>- “Permission to Enter”, “Tenant Not Home”, and “Work needed as a result of REAC Inspection or QMR Inspection” are boxes that can be clicked if applicable.</Typography> <br />
                            <Typography className={classes.textIndent1} variant='body2'>- Work To Be Done:  This is where the user can provide a detailed description of the issue needing to be addressed.  Keep in mind it is helpful to be specific, examples:</Typography> <br />
                            <Typography className={classes.textIndent2} variant='body2'>- Instead or “light needs to be fixed”, address which light: “light in bathroom needs to be changed”.</Typography> <br />
                            <Typography className={classes.textIndent2} variant='body2'>- Instead of “issues with sink”, be more specific: “sink in kitchen is leaking”.</Typography> <br />
                        
                            <Typography className={classes.textIndent} variant='body2'>Once all required fields are populated on the form the user can then submit the work order.  If not all required fields are populated, an error will pop up showing the user which required fields remain.</Typography> <br /><br />

                            <Typography className={classes.h5} variant='h5'>3.2 Profile</Typography>
                            <Typography className={classes.caption} variant='body2'>3.2.1 Your Profile</Typography>
                            <Typography className={classes.textIndent} variant='body2'>Clicking on the 'Profile' tab on the navigation bar will direct the user to their profile information.</Typography> <br />
                            <Typography className={classes.caption} variant='body2'>3.2.2 Edit Profile</Typography> 
                            <Typography className={classes.textIndent} variant='body2'>To edit your profile simply click 'Edit Profile' and replace the necessary information before hitting the 'submit' button to save changes.</Typography> <br />
                            <Typography className={classes.caption} variant='body2'>3.2.3 Change Password</Typography>
                            <Typography className={classes.textIndent} variant='body2'>TO change your password simply click 'Change Password'.  Enter your new password twice and hit the 'submit' button to save changes.</Typography> <br /> 
                        </Paper>
                    </Grid>
                </Grid>
                <br /> <br />
            </>
        );
    }

}

export default connect()(withStyles(styles, { withTheme: true })(withRouter(HelpRC)));