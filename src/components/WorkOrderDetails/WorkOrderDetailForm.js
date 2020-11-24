import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';


//material ui imports
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { FormControl, FormControlLabel, withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    right: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'right'
        }
    },
    left: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'left'
        }
    },
})




class WorkOrderDetailForm extends Component {
    state = {
        enter: false,
        home: false,
        hanger: false,
        status: '',
    }


    componentDidUpdate() {

    }

    submit = () => {

    }

    handleChange = (event) => {
        console.log(event.target.name)
        console.log(event.target.checked)
        this.setState({
            [event.target.name]: event.target.checked
        })
    }

    handleSelect = (event) => {
        console.log(event.target.name);
        console.log(event.target.value);
        this.setState({
            ...this.state,
            [event.target.name]: event.target.value
        })
    }

    back = () => {
        this.props.history.goBack();
    }


    render() {
        const { classes } = this.props;
        return (
            <>
                <div><h1>Work Order Details</h1></div>
                <Grid
                    container
                    justify="center"
                    spacing={0}

                >
                    <Grid item xs={11} sm={10} md={10} lg={8} style={{ marginTop: 25 }} >
                        <Paper>
                            <Grid container justify="center">

                                <Grid item xs={10} className={classes.right} >

                                    <form onSubmit={this.submit}>
                                        <Grid item xs={12} style={{ marginBottom: 50, marginTop: 15 }}>
                                            <Typography>Work Order # 23</Typography>
                                        </Grid>
                                        <Grid container  >

                                            <Grid item xs={12} md={6}>
                                                <Grid container className={classes.left} >
                                                    <Grid item xs={12}>
                                                        <Typography>Name: Fraser 1</Typography>
                                                    </Grid>
                                                    <Grid item xs={12} >
                                                        <Typography>Address: 123 1st st</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <Typography>Date Submitted:  11/18/20</Typography>
                                                <Typography>Submitted By: </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid container direction='row-reverse'>
                                            <Grid item xs={12} md={6}>
                                                <FormControl style={{ marginBottom: 10 }} fullWidth >
                                                    <InputLabel >Status</InputLabel>
                                                    <Select fullWidth name="status" value={this.state.status} onChange={this.handleSelect}>
                                                        <MenuItem value={1}>Submitted</MenuItem>
                                                        <MenuItem value={2}>Assigned To Maintenance</MenuItem>
                                                        <MenuItem value={3}>In Progress</MenuItem>
                                                        <MenuItem value={4}>Further Action Needed</MenuItem>
                                                        <MenuItem value={5}>Work Complete</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl style={{ marginBottom: 10 }} fullWidth >
                                                    <InputLabel >Assigned To:</InputLabel>
                                                    <Select fullWidth name="status" value={this.state.status} onChange={this.handleSelect}>
                                                        <MenuItem value={1}>Will</MenuItem>
                                                        <MenuItem value={2}>Mike</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl style={{ marginBottom: 10 }} fullWidth >
                                                    <InputLabel >Priority:</InputLabel>
                                                    <Select fullWidth name="status" value={this.state.status} onChange={this.handleSelect}>
                                                        <MenuItem value={1}>Priority 1</MenuItem>
                                                        <MenuItem value={2}>Priority 2</MenuItem>
                                                        <MenuItem value={2}>Priority 3</MenuItem>
                                                        <MenuItem value={2}>Priority 4</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl style={{ marginBottom: 10 }} fullWidth >
                                                    <InputLabel >Order Type:</InputLabel>
                                                    <Select fullWidth name="status" value={this.state.status} onChange={this.handleSelect}>
                                                        <MenuItem value={1}>Non-Emergency</MenuItem>
                                                        <MenuItem value={2}>Emergency</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>


                                            <Grid item xs={12} md={6} >
                                                <Grid container style={{ textAlign: 'left' }}>
                                                    <Grid item xs={12}>
                                                        <FormControlLabel
                                                            label="Permission To Enter"
                                                            labelPlacement='end'
                                                            style={{ marginLeft: 0 }}
                                                            control={<Checkbox color="primary"
                                                                onClick={this.handleChange}
                                                                checked={this.state.enter}
                                                                name='enter' />}
                                                        /><br />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <FormControlLabel
                                                            label="Door Hanger Left"
                                                            labelPlacement='end'
                                                            style={{ marginLeft: 0 }}
                                                            control={<Checkbox color="primary"
                                                                onClick={this.handleChange}
                                                                checked={this.state.hanger}
                                                                name='hanger' />}
                                                        /><br />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <FormControlLabel
                                                            label="Tenant Not Home"
                                                            labelPlacement='end'
                                                            style={{ marginLeft: 0 }}
                                                            control={<Checkbox color="primary"
                                                                onClick={this.handleChange}
                                                                checked={this.state.home}
                                                                name='home' />}
                                                        /><br />
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>


                                        <TextField
                                            onChange={this.handleChange}
                                            fullWidth
                                            id="outlined-multiline-static"
                                            label="Work To Be Done"
                                            multiline
                                            rows={4}
                                            variant="outlined"

                                        /><br /><br />
                                        <TextField
                                            onChange={this.handleChange}
                                            fullWidth
                                            id="outlined-multiline-static"
                                            label="Details of Work Done"
                                            multiline
                                            rows={4}
                                            variant="outlined"

                                        /><br /><br />
                                        <Grid container justify='flex-start'>
                                            <FormControl>
                                                <TextField value='' InputLabelProps={{ shrink: true }} type='date' variant='outlined' label='Date Work Complete' />
                                            </FormControl>
                                        </Grid>


                                        <Grid item style={{ textAlign: 'center', marginBottom: 15 }}>
                                            <Button type="submit" color="primary" variant="contained">Submit</Button>{'  '}
                                            <Button color="primary" variant="contained" onClick={this.back}>Cancel</Button>

                                        </Grid>
                                    </form>
                                </Grid>
                            </Grid>
                        </Paper>

                    </Grid>
                </Grid>
            </>
        );
    }

}


export default connect()(withStyles(styles, { withTheme: true })(withRouter(WorkOrderDetailForm)));