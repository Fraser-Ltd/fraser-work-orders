import React, { Component } from 'react';
import { connect } from 'react-redux';

class propertyDetail extends Component {

    // Sets local state for the propertyDetail component

    state = {
        propertyName: this.props.properties.propertyName,
        propertyAddress: this.props.properties.propertyAddress,
        residentCoordinator: this.props.properties.residentCoordinator,
        id: this.props.properties.id,
        unit: '',
        unitId: '',
        editUnit: false,

    }


  editUnit = (unitId, unit) => {
      this.setState({
          editUnit: true,
          unitId: unitId,
          unit: unit,
      })
  }

  //  const id = req.body.id
  // const propertyName = req.body.property_ID
 // const unitNumber = req.body.property_Unit
 
 
  saveUnit = () => {
      this.props.dispatch({
          type:'EDIT_UNITS',
          payload:{
                property_ID: this.state.id,
                id: this.state.unitId,
                property_Unit: this.state.unit
          }
      });
      this.setState({
          ...this.state, 
          unit: '',
          unitId: '',
          editUnit: false,
      });
  }

    addUnit = (event) => {
        this.props.dispatch({
            type: 'ADD_UNITS',
            payload:{
                property_ID: this.state.id,
                property_Unit: this.state.unit
            }
        });
        this.setState ({
            ...this.state, 
            unit:'',
        })
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'FETCH_PROPERTY'
        })
        this.props.dispatch({ 
            type: 'GET_USERS'
         });
         this.props.dispatch({
             type: 'FETCH_UNITS'
         });
        console.log('after component did mount', this.props)
    }
    componentDidUpdate() {
        this.propsChange();

    }

    deleteProperty = (event) => {
        console.log('in delete property', this.props.properties.id);
        event.preventDefault();
        this.props.dispatch({
            type: 'LOOSE_PROPERTY',
            payload: this.props.properties.id
        })
    }

    saveChanges = (event) => {
        event.preventDefault();
        this.props.dispatch({
            type: 'EDIT_PROPERTY',
            payload: this.state
        })
        this.props.clearEditProperty();
    }
    propsChange = () => {
        if (this.props.properties.id !== this.state.id) {
            this.setState({
                propertyName: this.props.properties.propertyName,
                propertyAddress: this.props.properties.propertyAddress,
                residentCoordinator: this.props.properties.residentCoordinator,
                id: this.props.properties.id,
            });
        }
    }



    handleChange = (event) => {
        console.log('in handleChange', event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    handleSubmit = (event) => {
        console.log('in handleSubmit', this.state)
        event.preventDefault();
        this.props.dispatch({
            type: "ADD_PROPERTY",
            payload: this.state
        })
        this.setState({
            propertyName: '',
            propertyAddress: '',
            residentCoordinator: '',
            id: '',
        });
    }

    

    render() {
        console.log('property detail props', this.props);
        console.log('this.state', this.state);

        return (
            <>
                <div>
                    <p>{this.props.heading}</p>
                </div>

                <div><form onSubmit={this.handleSubmit}>

                    <input name='propertyName' type='text' value={this.state.propertyName} onChange={this.handleChange} placeholder='Property Name' />
                    <input name='propertyAddress' type='text' value={this.state.propertyAddress} onChange={this.handleChange} placeholder='Property Address' />
                    {this.props.users[0] &&
                        <select onChange={this.handleChange} name='residentCoordinator' value={this.state.residentCoordinator}>
                            <option value=''></option>
                            {this.props.users.filter(user => user.role !== 2)
                                .map(user => <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>)}
                        </select>}

                    



                    {!this.props.edit && <button onClick={this.handleSubmit} type="submit">Add New Property</button>}
                    {this.props.edit && <div><button onClick={this.saveChanges}>Save Changes</button><button onClick={this.props.clearEditProperty}>Cancle</button></div>}
                </form>
                {this.props.units[0] &&
                    <>
                        <ul>
                            {this.props.units.filter(units => units.property_id === this.state.id)
                                .map(unit => <li key={unit.id} value={unit.unit}>{unit.unit}<button onClick={()=>this.editUnit(unit.id, unit.unit)}>Edit Unit</button></li>)}
                        </ul>
                        <input name='unit' value={this.state.unit} onChange={this.handleChange} />
                        {this.state.editUnit?<button onClick={this.saveUnit}>Save Changes</button>:<button onClick={this.addUnit}>Add Unit</button>}
                        </>
                    }</div>
            </>
        )
    };
}

const mapStoreToProps = (store) => ({
    users: store.allUsers,
    units: store.units
})

export default connect(mapStoreToProps)(propertyDetail);
