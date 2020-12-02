import React from 'react';
import { Link } from 'react-router-dom';
import MyndexModel from '../models/myndex';
import Tradier from '../models/tradier';

class IndexCard extends React.Component {
  state = {
    performance: 0
  }

  componentDidMount() {
    this.pullQuotes(this.props.index.holdings)
  }

  onDelete = (index) => {
    MyndexModel.delete(index)
  }

  pullQuotes = (tickers) => {
    Tradier.fill(tickers.join()).then(res => {
      let average = 0;
      if (res.data.quotes.quote.change_percentage) {
        average = res.data.quotes.quote.change_percentage
      } else {
        let total = 0
        for (let i = 0; i < res.data.quotes.quote.length; i++) {
          total += res.data.quotes.quote[i].change_percentage
        }
        average = total / res.data.quotes.quote.length
      }
      this.setState({performance: average})
    })
  }

  render() {
    return(
      <div className="index-card">
        ID#: {this.props.index._id}
        <p>{this.props.index.holdings}</p>
        <p>Today's performance: {this.state.performance}</p>
        <button onClick={() => this.onDelete(this.props.index._id)}>delete the above index</button>
        <Link to={`/myndeces/${this.props.index._id}/edit`}>
          <p>edit the above index</p>
        </Link>
      </div>
    )
  }
}

export default IndexCard;
