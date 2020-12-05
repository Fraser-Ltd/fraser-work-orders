import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//material ui imports
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input'
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

//pages
import './InfoPage.css'

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

class EditUserPassword extends Component {
    state = {
        item: {
            id: this.props.user.id,
            password: '',
            confirmPassword: ''
        },
        error: false
    };

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER' });
    }

    submit = (event) => {
        event.preventDefault();
        const { password, confirmPassword } = this.state.item;
        console.log(confirmPassword, password)
        if (password !== confirmPassword) {
            alert("Passwords don't match");
        } else {
            this.props.dispatch({
                type: 'UPDATE_PASSWORD',
                payload: this.state.item
            });
            this.props.clearEdit();
        }
    }

    handleChange = (event) => {
        if (event.target.name === "confirmPassword") {
            if (this.state.item.password !== event.target.value) {
                this.setState({
                    ...this.state,
                    item: { ...this.state.item, [event.target.name]: event.target.value },
                    error: true
                })
            } else {
                this.setState({
                    ...this.state,
                    item: { ...this.state.item, [event.target.name]: event.target.value },
                    error: false
                })
            }
        } else {
            this.setState({
                ...this.state,
                item: { ...this.state.item, [event.target.name]: event.target.value }
            })
        }
    }

    back = () => {
        this.props.clearEdit()
    }


    render() {
        console.log("info item props", this.props)
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
                                        <br /><br />
                                        <InputLabel>Change Password</InputLabel>
                                        <br /><br />
                                        <FormControl fullWidth margin="dense">
                                            <InputLabel htmlFor="password-new" error={this.state.error}>
                                                {'New Password'}
                                            </InputLabel>
                                            <Input
                                                id="password"
                                                name='password'
                                                type="password"
                                                onChange={this.handleChange}
                                                value={this.state.item.password}
                                                required
                                                error={this.state.error}
                                            />
                                            <FormHelperText
                                            // error={Boolean(touched.newPass && errors.newPass)}
                                            >
                                                {/* {touched.newPass && errors.newPass ? errors.newPass : ''} */}
                                            </FormHelperText>
                                        </FormControl>

                                        <FormControl fullWidth margin="dense">
                                            <InputLabel htmlFor="password-confirm" error={this.state.error}>
                                                {'Confirm Password'}
                                            </InputLabel>
                                            <Input
                                                id="password"
                                                name='confirmPassword'
                                                type="password"
                                                value={this.state.item.confirmPassword}
                                                onChange={this.handleChange}
                                                required
                                                error={this.state.error}
                                            />
                                            {this.state.error && <FormHelperText
                                                error={true}
                                            >
                                                Passwords must match
                                            </FormHelperText>}
                                        </FormControl>
                                        <br /><br />
                                        <Grid item style={{ textAlign: 'center', marginBottom: 15 }}>
                                            <Button disabled={this.state.error} type="submit" color="primary" variant="contained">Submit</Button>{'  '}
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

export default connect()(withRouter(withStyles(styles, { withTheme: true })(EditUserPassword)));