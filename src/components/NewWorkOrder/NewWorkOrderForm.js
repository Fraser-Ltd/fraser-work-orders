import React, { Component } from 'react';
import { connect } from 'react-redux';


//material ui imports
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormLabel from '@material-ui/core/FormLabel';
import { FormControl, FormControlLabel, withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';

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




class NewWorkOrderForm extends Component {
    state = {
        enter: false,
        home: false,
        hanger: false,
        status: '',
    }
    componentDidMount(){
        this.props.dispatch({ type: 'FETCH_UNITS'});
        this.props.dispatch({ type: 'FETCH_PROPERTY'});
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

    }


    render() {
        const { classes } = this.props;
        return (
            <>
                <Grid
                    container
                    justify="center"
                    spacing={0}

                >
                    <Grid item xs={11} sm={6} md={5} lg={4} style={{ marginTop: 25 }} >
                        <Paper>
                            <Grid container justify="center">
                                <Grid item xs={10}  >
                                    <form onSubmit={this.submit}>
                                        <Grid item xs={12}>
                                            <Grid container direction='column' alignItems='center'   >
                                                <Grid item xs={12}>
                                                    <Typography>Name: Fraser 1</Typography>
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <Typography>Address: 123 1st st</Typography>
                                                </Grid>
                                                <Grid container justify='center'>
                                                    <Grid item xs={12} sm={10} md={8} lg={6}>
                                                    <FormControl style={{ marginBottom: 10 }} fullWidth >
                                                        <InputLabel >Order Type:</InputLabel>
                                                        <Select fullWidth name="status" value={this.state.status} onChange={this.handleSelect}>
                                                            <MenuItem value={1}>Non-Emergency</MenuItem>
                                                            <MenuItem value={2}>Emergency</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>


                                        <Grid item xs={12} >
                                            <Grid container direction='column' alignItems='center' justify='center' style={{ textAlign: 'left' }}>
                                                <Grid item xs={12}>
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
                                                            label="Tenant Not Home"
                                                            labelPlacement='end'
                                                            style={{ marginLeft: 0 }}
                                                            control={<Checkbox color="primary"
                                                                onClick={this.handleChange}
                                                                checked={this.state.home}
                                                                name='home' />}
                                                        /><br />
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <FormControlLabel
                                                            label="Work needed as a result of REAC Inspection or QMR Inspection"
                                                            labelPlacement='end'
                                                            style={{ marginLeft: 0 }}
                                                            control={<Checkbox color="primary"
                                                                onClick={this.handleChange}
                                                                checked={this.state.enter}
                                                                name='enter' />}
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

export default connect()(withStyles(styles, { withTheme: true })(NewWorkOrderForm));