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

class HelpMaint extends Component {
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
                                    <Typography variant='h3'>Maintenance Help Page</Typography>
                                    <Typography variant='caption'>These are instructions for Maintenance only</Typography>
                                </Grid>
                            </Grid>
                            <br />
                            <Typography className={classes.h4} variant='h4'>1.0 Application Overview</Typography>
                            <Typography className={classes.headCaption} variant='body2'>The Fraser MMS application is a custom-built web-based solution to Fraser, LTD’s ongoing maintenance management system.  This will streamline communication between Resident Coordinators, the Director of Program Operations, and the maintenance staff with a goal to eliminate paperwork, add visibility, and simplify the work order process.</Typography>
                            <br /> <br />
                            <Typography className={classes.h4} variant='h4'>2.0 Important Information</Typography>
                            <Typography className={classes.headCaption} variant='body2'>For trouble-free operation of the MMS, please read and understand all instructions before use.</Typography>
                            <br /> <br />
                            <Typography className={classes.h4} variant='h4'>3.0 Operation</Typography>
                            <br />
                            <Typography className={classes.h5} variant='h5'>3.1 Work Orders</Typography>
                            <Typography className={classes.headCaption} variant='body2'>Once logged in, all users will be automatically directed to the Work Orders Page.  Note this page will look different depending on the User Role.</Typography> <br />
                            <Typography className={classes.caption} variant='body2'>3.1.1 Work Orders to Review</Typography>
                            <Typography className={classes.textIndent} variant='body2'>This table provides a high-level detail of submitted work orders and will allow Maintenance to review work orders prior to working on them. To review a work order, simply click on the applicable work order.  This will take you to the 'Work Orders Details' form.  From here you can review the details of the work order and change the status from 'Assigned To Maintenance' to the applicable status.  Once the status has changed, the work order will move into the ‘Current Work Orders’ table.</Typography> <br /><br />
                            <Typography className={classes.caption} variant='body2'>3.1.2 Current Work Orders</Typography>
                            <Typography className={classes.textIndent} variant='body2'>This table displays work orders that Maintenance has reviewed.  When it’s time to complete the work order, simply click on the applicable work order.  This will direct you to the ‘Work Orders Details’ form.  Fill out the form as follows:</Typography> <br />
                            <Typography className={classes.textIndent1} variant='body2'>Select or unselect the applicable fields (located on the upper left of the form):</Typography>
                            <Typography className={classes.textIndent2} variant='body2'>- Permission to Enter</Typography>
                            <Typography className={classes.textIndent2} variant='body2'>- Door Hanger Left</Typography>
                            <Typography className={classes.textIndent2} variant='body2'>- Tenant Not Home</Typography>
                            <br />
                            <Typography className={classes.textIndent1} variant='body2'>On the upper right of the form, update:</Typography>
                            <Typography className={classes.textIndent2} variant='body2'>- Status: (select the appropriate status)</Typography>
                            <Typography className={classes.textIndent2} variant='body2'>- Priority: (if necessary)</Typography>
                            <Typography className={classes.textIndent2} variant='body2'>- Order Type: (if necessary)</Typography>
                            <br />
                            <Typography className={classes.textIndent1} variant='body2'>Work To Be Done:</Typography>
                            <Typography className={classes.textIndent2} variant='body2'>- You may not need to update this, as this is usually handled by who ever submitted the work order, however you may update this field is necessary.</Typography>
                            <br />
                            <Typography className={classes.textIndent1} variant='body2'>Details of Work Done:</Typography>
                            <Typography className={classes.textIndent2} variant='body2'>- Here is where you'll describe the work performed to close the work order.</Typography>
                            <br />
                            <Typography className={classes.textIndent1} variant='body2'>Time In and Time Out:</Typography>
                            <Typography className={classes.textIndent2} variant='body2'>- Selecting the 'Time In' and the 'Time Out' buttons will create a timestamp designed to record how long it takes to complete the work order.</Typography>
                            <br />
                            <Typography className={classes.textIndent1} variant='body2'>On the lower right of the form, update if necessary:</Typography>
                            <Typography className={classes.textIndent2} variant='body2'>- Work needed as result of REAC or QMR inspection</Typography>
                            <Typography className={classes.textIndent2} variant='body2'>- All smoke detectors operational</Typography>
                            <Typography className={classes.textIndent2} variant='body2'>- Housekeeping Inspection Required</Typography>
                            <Typography className={classes.textIndent2} variant='body2'>- Extermination needed</Typography>
                            <br />
                            <Typography className={classes.textIndent1} variant='body2'>Clicking 'Submit' will save changes made to the Work order but will not mark work order complete unless status of work order is complete.</Typography>
                            <Typography className={classes.textIndent1} variant='body2'>Clicking 'Cancel' will discard any changes.</Typography>
                            <br />
                            <Typography className={classes.caption} variant='body2'>3.1.3 Completed Work Orders</Typography>
                            <Typography className={classes.textIndent} variant='body2'>Work orders that are complete will show up here.</Typography> <br />
                            <Typography className={classes.caption} variant='body2'>3.1.4 Create New Work Order</Typography>
                            <Typography className={classes.textIndent} variant='body2'>Clicking on the “CREATE NEW WORK ORDER” button on the Work Orders page will direct the user to the “Add New Work Order” form.  The form contains the following fields:</Typography> <br />
                            <Typography className={classes.textIndent1} variant='body2'>- Work To Be Done:  This is where the user can provide a detailed description of the issue needing to be addressed.  Keep in mind it is helpful to be specific, examples:</Typography> <br />
                            <Typography className={classes.textIndent1} variant='body2'>- Property:  This is a drop down with all available properties*.  Choose the applicable property.  If the property has units associated with it, another drop down will appear for the user to select the applicable unit.  If a property or unit is not available, contact admin and they will add the unit or property.</Typography> <br />
                            <Typography className={classes.textIndent1} variant='body2'>- Order Type: This field is defaulted to Non-Emergency, if the work order is an Emergency, simply select “Emergency” from the drop down.</Typography> <br />
                            <Typography className={classes.textIndent1} variant='body2'>- “Permission to Enter”, “Tenant Not Home”, and “Work needed as a result of REAC Inspection or QMR Inspection” are boxes that can be clicked if applicable.</Typography> <br />
                            <Typography className={classes.textIndent1} variant='body2'>- Work To Be Done:  This is where the user can provide a detailed description of the issue needing to be addressed.  Keep in mind it is helpful to be specific, examples:</Typography> <br />
                            <Typography className={classes.textIndent2} variant='body2'>- Instead or “light needs to be fixed”, address which light: “light in bathroom needs to be changed”.</Typography> <br />
                            <Typography className={classes.textIndent2} variant='body2'>- Instead of “issues with sink”, be more specific: “sink in kitchen is leaking”.</Typography> <br />
                        
                            <Typography className={classes.textIndent} variant='body2'>Once all required fields are populated on the form the user can then submit the work order.  If not all required fields are populated, an error will pop up showing the user which required fields remain.</Typography> <br /><br />

                            <Typography className={classes.h5} variant='h5'>3.2 Profile</Typography> <br />
                            <Typography className={classes.caption} variant='body2'>3.2.1 Your Profile</Typography>
                            <Typography className={classes.textIndent} variant='body2'>Clicking on the 'Profile' tab on the navigation bar will direct the user to their profile information.</Typography> <br />
                            <Typography className={classes.caption} variant='body2'>3.2.2 Edit Profile</Typography> 
                            <Typography className={classes.textIndent} variant='body2'>To edit your profile simply click 'Edit Profile' and replace the necessary information before hitting the 'submit' button to save changes.</Typography> <br />
                            <Typography className={classes.caption} variant='body2'>3.2.3 Change Password</Typography>
                            <Typography className={classes.textIndent} variant='body2'>T0 change your password simply click 'Change Password'.  Enter your new password twice and hit the 'submit' button to save changes.</Typography> <br /> 
                            <br /> <br />
                        </Paper>
                    </Grid>
                </Grid>
                <br /> <br />
            </>
        );
    }

}

export default connect()(withStyles(styles, { withTheme: true })(withRouter(HelpMaint)));