import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Button } from 'grommet';
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
          average = total / res.data.quotes.quote.length
        }
        this.setState({performance: average})
      })
    }
  }

  render() {
    return(
      <Card height="medium" width="medium" background="light-1" elevation="medium">
        <CardHeader pad="medium">{this.props.index.indexName}</CardHeader>
        <CardBody pad="medium">
          ID#: {this.props.index._id}
          {console.log(this.props.index)}
          {/* <p>{this.props.index.holdings}</p> */}
          <p>Today's performance: {this.state.performance}</p>
        </CardBody>
        <CardFooter pad={{horizontal: "small"}} background="light-2">
          <Button icon={<ShareOption color="plain" />} hoverIndicator />
          <Link to={`/myndeces/${this.props.index._id}/edit`}>
            <p>edit the above index</p>
          </Link>
          <Button onClick={() => this.onDelete(this.props.index._id)}>delete the above index</Button>
        </CardFooter>
      </Card>
    )
  }
}

export default IndexCard;
