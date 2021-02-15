import React from 'react';
import { Link } from 'react-router-dom';
import * as clipboard from "clipboard-polyfill/text";
import { Box, Card, CardHeader, CardBody, CardFooter, Button, Heading, TextInput } from 'grommet';
import { ShareOption } from 'grommet-icons';
import MyndexModel from '../models/myndex';
import Tradier from '../models/tradier';
import SmallRich from './SmallRich';

class IndexCard extends React.Component {
  state = {
    performance: 0
  }

  componentDidMount() {
    console.log("id: ", this.props.index._id)
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

  shareIndex = () => {
    const el = document.createElement('textarea');
    let currentAddress = window.location.href
    let partOne = currentAddress.replace('dashboard', '')
    el.value = partOne + this.props.index._id;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    alert(`Copied your link to the clipboard: ${el.value}`);
  }

  render() {
    return(
      <Card height="500px" width="medium" background="light-1" elevation="medium" margin="medium" key={this.props.id}>
        <CardHeader pad="xsmall" height='xxsmall'><Heading level='3'>{this.props.index.indexName}</Heading></CardHeader>
        <CardBody pad="small">
          <SmallRich holdings={this.props.index.holdings} />
        </CardBody>
        <CardFooter pad={{horizontal: "small"}} height='small' background="light-2">
          <Box>
            <Box>
              <p>Components: {this.props.index.holdings.toString().replace(/,/g, ', ')}</p>
              <p>Today's gain: {this.state.performance}%</p>
            </Box>
            <Box direction='row'>
              <Button icon={<ShareOption color="plain" />} hoverIndicator onClick={this.shareIndex} />
              <Link to={`/myndeces/${this.props.index._id}/edit`}>
                <Button label='edit' />
              </Link>
              <Link to='/dashboard'>
                <Button label='delete' onClick={() => this.onDelete(this.props.index._id)} />
              </Link>
              {/* <TextInput value={this.props.index._id} id={this.props.index._id} /> */}
            </Box>
          </Box>
        </CardFooter>
      </Card>
    )
  }
}

export default IndexCard;
