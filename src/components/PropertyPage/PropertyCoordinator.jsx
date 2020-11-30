import React, { Component } from 'react';
import { connect } from 'react-redux';


class propertyCoordinator extends Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'GET_USERS'
        })
        console.log(this.props)
    }

    state = {
        username: this.props.user.username,
        id: this.props.user.id,
    }



    handleChange = (event) => {
        console.log('in handleChange', event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {

        const users = this.props.users;
        const {classes} = this.props;
        
        return (
            <>
              {this.props.user.map((user) => 
                <option name={user} key={user.id}>{user.username}</option>
                )
            }
            </>
        )

    }
}



export default connect()(propertyCoordinator);