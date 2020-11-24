import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class EditProfile extends Component {
    state = {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    };

    handleChange(event) {
        this.setState({ username: event.target.value });
    }

    handleSave() {
        this.setState({ mode: 'view' });
        this.props.dispatch({
            type: 'UPDATE_USER',
            payload: {id: this.props.user.id, 
                username: this.state.username, 
                first_name: this.state.first_name, 
                last_name: this.state.last_name, 
                email: this.state.email,}
        })
    }

    handleEdit() {
        this.setState({ mode: 'edit' });
    }

    render() {
        return (
            <div>
                <button>Edit Profile</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ user: state.user })

export default connect(mapStateToProps)(withRouter(EditProfile));