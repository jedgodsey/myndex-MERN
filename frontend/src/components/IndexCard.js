import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Button, Heading } from 'grommet';
import { ShareOption } from 'grommet-icons';
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
    if (tickers.length > 0) {
      Tradier.fill(tickers.join()).then(res => {
        let average = 0;
        if (res.data.quotes.quote.change_percentage) {
          average = res.data.quotes.quote.change_percentage
        } else {
          let total = 0
          for (let i = 0; i < res.data.quotes.quote.length; i++) {
            total += res.data.quotes.quote[i].change_percentage
          }
          average = (total / res.data.quotes.quote.length).toFixed(2);
        }
        this.setState({performance: average})
      })
    }
  }

  render() {
    return(
      <Card height="medium" width="medium" background="light-1" elevation="medium" margin="medium">
        <CardHeader pad="medium"><Heading level='3'>{this.props.index.indexName}</Heading></CardHeader>
        <CardBody pad="medium">
          ID#: {this.props.index._id}
          {console.log(this.props.index.holdings)}
          <p>Components: {this.props.index.holdings.toString().replace(/,/g, ', ')}</p>
          <p>Today's gain: {this.state.performance}%</p>
        </CardBody>
        <CardFooter pad={{horizontal: "small"}} background="light-2">
          <Button icon={<ShareOption color="plain" />} hoverIndicator />
          <Link to={`/myndeces/${this.props.index._id}/edit`}>
            <Button label='edit' />
          </Link>
          <Button label='delete' onClick={() => this.onDelete(this.props.index._id)} />
        </CardFooter>
      </Card>
    )
  }
}

export default IndexCard;
