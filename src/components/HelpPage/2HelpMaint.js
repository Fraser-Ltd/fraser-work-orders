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
                                    <Typography variant='h2'>Fraser MMS</Typography>
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
                            <Typography variant='h5'>3.1 Work Orders</Typography>
                            <Typography variant='body2'>3.1.1 Work Orders to Review</Typography> <br />
                            <Typography variant='body2'>3.1.2 Current Work Orders</Typography> <br />
                            <Typography variant='body2'>3.1.3 Completed Work Orders</Typography> <br />
                            <Typography variant='body2'>3.1.4 Create New Work Order</Typography> <br />

                            <Typography variant='h5'>3.2 Profile</Typography>
                            <Typography variant='body2'>3.2.1 Your Profile</Typography>  <br />
                            <Typography variant='body2'>3.2.2 Edit Profile</Typography>  <br />
                            <Typography variant='body2'>3.2.3 Change Password</Typography>  <br />

                        </Paper>
                    </Grid>
                </Grid>
                <br /> <br />
            </>
        );
    }

}

export default connect()(withStyles(styles, { withTheme: true })(withRouter(HelpMaint)));