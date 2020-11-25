import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

//material ui imports
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core';
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

class EditUserPassword extends Component {
    state = {
        password: "",
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_USER' });
    }

    submit = (e) => {
        this.setState({ mode: 'view' });
        this.props.dispatch({
            type: 'UPDATE_USER',
            payload: {id: this.props.user.id, text: this.state.password,}
        })
    }

    handleChange = (event) => {
        this.setState({
            password: ""
        })
    }

    back = () => {
        this.props.clearEdit()
    }

    render() {
        return (
            <div>
                <button>Change Password</button>
            </div>
        );
    }
}

export default connect()(withRouter(withStyles(styles, { withTheme: true })(EditUserPassword)));