import React from 'react';
import { Link } from 'react-router-dom';
import MyndexModel from '../models/myndex';
import Tradier from '../models/tradier';

class IndexCard extends React.Component {

  componentDidMount() {
    this.pullQuotes(this.props.index.holdings)
  }

  onDelete = (index) => {
    MyndexModel.delete(index)
  }

  pullQuotes = (tickers) => {
    console.log(this.props.index.holdings)
    Tradier.fill(tickers.join()).then(res => {
      console.log((res.data.quotes.quote.reduce((a, b) => a + b.change_percentage, 0)) / res.data.quotes.quote.length) // change this reduce to a loop or something
    })
  }

  render() {
    return(
      <div className="index-card">
        ID#: {this.props.index._id}
        <p>{this.props.index.holdings}</p>
        <button onClick={() => this.onDelete(this.props.index._id)}>delete the above index</button>
        <Link to={`/myndeces/${this.props.index._id}/edit`}>
          <p>edit the above index</p>
        </Link>
      </div>
    )
  }
}

export default IndexCard;
