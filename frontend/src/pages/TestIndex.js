import React from "react";
import { Box, TextInput, Image, Text } from "grommet";
import Tag from '../components/Tag';
import Tradier from '../models/tradier';
import MyndexModel from '../models/myndex';
import ListItem from '../components/ListItem';

class TestIndex extends React.Component {
  state = {
    query: '',
    list: [],
    selections: []
  };

  //---------------- my functions ------------------
  handleChange = (event) => {
    this.setState({
      query: event.target.value
    }, () => {
      Tradier.populate(this.state.query)
        .then(data => {
          console.log('that data: ', data)
          this.setState({list: data})
        })
    })
  }

  submitTicker = (ticker) => {
    let newTicker = this.state.selections.concat(ticker)
    this.setState({
      selections: newTicker,
      query: ''
    })
  }
  // submitTicker = (event) => {
  //   event.preventDefault();
  //   let newTicker = this.state.selections.concat(event.target.ticker.value)
  //   this.setState({
  //     selections: newTicker,
  //     query: ''
  //   })
  // }

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

  //------------------grommet functions--------------------
  onRemoveTag = index => {
    const { tags } = this.state;
    const newTags = [...tags];
    newTags.splice(index, 1);
    this.setState({
      tags: newTags
    });
  };
  onSelectTag = tag => {
    const { tags } = this.state;
    this.setState({
      tags: [...tags, tag]
    });
  };

  renderTags = (tags, onRemove) => {
    return (
      <Box direction="row">
        {tags.map((tag, index) => (
          <Tag key={tag} onRemove={() => onRemove(index)}>
            {tag}
          </Tag>
        ))}
      </Box>
    );
  };

  renderSuggestions = () => {
    return this.state.list.map((item, index, list) => ({
        label: (
          <Box
            direction="row"
            align="center"
            gap="small"
            border={index < list.length - 1 ? 'bottom' : undefined}
            pad="small"
            onClick={() => this.submitTicker(item.symbol)}
            // onClick={() => {this.submitTicker(item.symbol)}}
          >
            <Text>
              <strong>{`${item.symbol}: ${item.description}`}</strong>
            </Text>
          </Box>
        ),
        value: item,
      }));
  };


  render() {
    const { tags } = this.state;
    return (
      <Box>
        <Box direction="row" border="all">
          {this.state.selections.length > 0 && this.renderTags(this.state.selections, this.onRemoveTag)}
          <Box>
            <TextInput
              plain={true}
              placeholder="Search and Select Companies"
              type="search"
              value={this.state.query}
              onChange={this.handleChange}
              name="ticker"
              // onSelect={({ suggestion }) =>
              //   this.setState(
              //     {
              //       search: ""
              //     },
              //     () => this.onSelectTag(suggestion)
              //   )
              // }
              // suggestions={suggestions.filter(item => item.indexOf(search) >= 0)}
              suggestions={this.renderSuggestions()}
            />
          </Box>
        </Box>
        <h1>EditIndex.js</h1>
        Current Stocks: {this.state.selections.map(item => item + ', ')}
        {/* <form onSubmit={this.submitTicker}>
          <input type='text' value={this.state.query} name="ticker" />
          <ul>
            {this.fillList()}
          </ul>
          <input type='submit' value="Add Stock" />
        </form> */}
        <form onSubmit={this.updateIndex}>
          <input type="text" name="name" label="Index Name" />
          <input type="submit" value="Update Index" />
        </form>
      </Box>
    );
  }
}

export default TestIndex;
