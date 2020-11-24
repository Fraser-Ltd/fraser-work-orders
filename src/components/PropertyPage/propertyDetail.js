import React, { Component } from 'react';
import { connect } from 'react-redux';


class InfoPage extends Component {



  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log('in handleChange', event.target.value);
  }

  handleSubmit = (event) => {
    console.log('form submitted')
    this.props.dispatch({
      type:"ADD_ITEM", 
      payload: this.state
    })
    this.setState({
      item_name: '',
      item_model: '',
      item_detail: '',
      item_location: '',
      item_image: '',
      item_price: ''
    });
    console.log('set state')
  }

  render() {
    return (
      <>
        <div>
          <p>New item page! Please enter in a new item to your collection.</p>
        </div>
        <div><form onSubmit={this.handleSubmit}>
          <input name='item_name' type='text' value={this.state.item_name} onChange={this.handleChange} placeholder='Item Name' />
          <input name='item_model' type='text' value={this.state.item_model} onChange={this.handleChange} placeholder='Item Model' />
          <input name='item_detail' type='text' value={this.state.item_detail} onChange={this.handleChange} placeholder='Item Detail' />
          <input name='item_location' type='text' value={this.state.item_location} onChange={this.handleChange} placeholder='Item Location' />
          <input name='item_image' type='text' value={this.state.item_image} onChange={this.handleChange} placeholder='Item Image' />
          <input name='item_price' type='text' value={this.state.item_price} onChange={this.handleChange} placeholder='Item Price' />
          <button type="submit">Submit Item</button>
        </form>
        </div>
        <div>
        </div>
      </>)
  };
}

export default connect()(InfoPage);
