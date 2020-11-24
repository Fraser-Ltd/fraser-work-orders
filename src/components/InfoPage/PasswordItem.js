import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class EditProfile extends Component {
    state = {

    }

    render() {
        return (
            <div>
                <button>Change Password</button>
            </div>
        );
    }
}

export default connect(mapStoreToProps)(EditProfile);