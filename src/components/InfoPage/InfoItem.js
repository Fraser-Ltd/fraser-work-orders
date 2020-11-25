import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

//material ui imports
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { FormControl, FormControlLabel, withStyles } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    center: {
        [theme.breakpoints.down('sm')]: {
            textAlign: 'center'
        },
        [theme.breakpoints.up('md')]: {
            textAlign: 'right'
        }
    },
})

class EditProfile extends Component {
    state = {
        item: {
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            editProfile: false
        }
    };

    componentDidMount() {
        this.props.dispatch({ type: 'GET_USERS' });
    }

    submit = (e) => {
        e.preventDefault()
        this.props.dispatch({ type: 'UPDATE_USER', payload: this.state })
    }

    handleCheck = (event) => {
        this.setState({
            ...this.state,
            [event.target.name]: event.target.checked
        })
    }

    handleChange = (event) => {
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
                                            <Grid container direction='column' alignItems='center'>
                                            <TextField
                                            onChange={this.handleChange}
                                            fullWidth
                                            value={this.state.username}
                                            name='username'
                                            id="outlined-multiline-static"
                                            label={this.state.username}
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            required
                                        /><br /><br />
                                            </Grid>
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

const mapStateToProps = (store) => ({ properties: store.properties, units: store.units, user: store.user })

export default connect(mapStateToProps)(withRouter(withStyles(styles, { withTheme: true })(EditProfile)));