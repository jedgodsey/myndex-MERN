import React from 'react';
import Tradier from '../models/tradier';
import MyndexModel from '../models/myndex';
import ListItem from '../components/ListItem';

class EditIndex extends React.Component {
  state = {
    query: '',
    list: [],
    selections: []
  }

  handleChange = (event) => {
    this.setState({
      query: event.target.value
    }, () => {
      Tradier.populate(this.state.query)
        .then(data => {
          this.setState({list: data})
        })
    })
  }

  submitTicker = (event) => {
    event.preventDefault();
    let newTicker = this.state.selections.concat(event.target.ticker.value)
    this.setState({
      selections: newTicker,
      query: ''
    })
  }

  fillList = () => {
    return this.state.list && this.state.query ? this.state.list.map((item, index) => <ListItem stock={item} pickTicker={this.pickTicker} />) : null
  }

  pickTicker = (ticker) => {
    this.setState({query: ticker})
  }

  updateIndex = (event) => {
    event.preventDefault();
    MyndexModel.update({
      id: this.props.match.params.id,
      holdings: this.state.selections
    })
  }

  render() {
    return(
      <>
        <h1>EditIndex.js</h1>
        Current Stocks: {this.state.selections.map(item => item + ', ')}
        <form onSubmit={this.submitTicker}>
          <input type='text' onChange={this.handleChange} value={this.state.query} name="ticker" />
          <ul>
            {this.fillList()}
          </ul>
          <input type='submit' value="Add Stock" />
        </form>
        <form onSubmit={this.updateIndex}>
          <input type="text" name="name" label="Index Name" />
          <input type="submit" value="Update Index" />
        </form>
      </>
    )
  }
}

export default EditIndex;
