import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//material ui imports
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


class EditProfile extends Component {
    state = {
        item: {
            id: this.props.user.id,
            userName: this.props.user.username,
            firstName: this.props.user.first_name,
            lastName: this.props.user.last_name,
            email: this.props.user.email,
        }
    };

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER' });
    }


    submit = (e) => {
        e.preventDefault();
        this.setState({ mode: 'view' });
        this.props.dispatch({
            type: 'UPDATE_USER',
            payload: this.state.item
        });
        this.props.clearEdit();
    }

    handleChange = (event) => {
        this.setState({
            ...this.state,
         item: {...this.state.item, [event.target.name]: event.target.value }
        })
    }

    back = () => {
        this.props.clearEdit()
    }


    render() {
        console.log("info item props", this.props)
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
                                        <InputLabel>Edit Profile</InputLabel>
                                        <br /><br />
                                        <TextField
                                            onChange={this.handleChange}
                                            fullWidth
                                            value={this.state.item.userName}
                                            name='userName'
                                            id="outlined-multiline-static"
                                            label="Change Username"
                                            multiline
                                            rows={1}
                                            variant="outlined"
                                            required
                                        />
                                        <br /><br />
                                        <TextField
                                            onChange={this.handleChange}
                                            fullWidth
                                            value={this.state.item.firstName}
                                            name='firstName'
                                            id="outlined-multiline-static"
                                            label="Change First Name"
                                            multiline
                                            rows={1}
                                            variant="outlined"
                                            required
                                        />
                                        <br /><br />
                                        <TextField
                                            onChange={this.handleChange}
                                            fullWidth
                                            value={this.state.item.lastName}
                                            name='lastName'
                                            id="outlined-multiline-static"
                                            label="Change Last Name"
                                            multiline
                                            rows={1}
                                            variant="outlined"
                                            required
                                        />
                                        <br /><br />
                                        <TextField
                                            onChange={this.handleChange}
                                            fullWidth
                                            value={this.state.item.email}
                                            name='email'
                                            id="outlined-multiline-static"
                                            label="Change email"
                                            multiline
                                            rows={1}
                                            variant="outlined"
                                            required
                                        />
                                        <br /><br />
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

export default connect()(withRouter(EditProfile));