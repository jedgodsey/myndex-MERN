import React from "react";
import { Box, TextInput, Button, Text, Card } from "grommet";
import { Search } from 'grommet-icons';
import Tag from '../components/Tag';
import Tradier from '../models/tradier';
import MyndexModel from '../models/myndex';

class AddIndex extends React.Component {
  state = {
    query: '',
    list: [],
    selections: [],
    name: ''
  };

  //---------------- my functions ------------------
  handleStockChange = (event) => {
    this.setState({
      query: event.target.value
    }, () => {
      Tradier.populate(this.state.query)
        .then(data => {
          this.setState({list: data})
        })
    })
    console.log('my query: ', this.state.query)
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  submitTicker = (ticker) => {
    let newTicker = this.state.selections.concat(ticker)
    this.setState({
      selections: newTicker,
      query: '',
      list: []
    })
  }

  addIndex = (event) => {
    MyndexModel.create({
      indexName: this.state.name,
      holdings: this.state.selections
    })
  }

  //------------------grommet functions--------------------
  onRemoveTag = index => {
    const newTags = [...this.state.selections];
    newTags.splice(index, 1);
    this.setState({
      selections: newTags
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
    if (this.state.list && this.state.query) {
      return this.state.list.map((item, index, list) => ({
        label: (
          <Box
            direction="row"
            align="center"
            gap="small"
            border={index < list.length - 1 ? 'bottom' : undefined}
            pad="small"
            onClick={() => this.submitTicker(item.symbol)}
          >
            <Text>
              <strong>{`${item.symbol}: ${item.description}`}</strong>
            </Text>
          </Box>
        ),
        value: item,
      }));
    }
  };

  render() {
    return (
      <Card height="large" width="xlarge" background="light-1" elevation="medium">
        <Box margin="large" padding="medium">
          <strong>Create a New Index</strong>
          <TextInput
                // plain={true}
                placeholder="Enter The Name of Your Index"
                // type="search"
                value={this.state.name}
                onChange={this.handleNameChange}
                // name="indexName"
              />
          <Box direction="row" border="all">
            {this.state.selections.length > 0 && this.renderTags(this.state.selections, this.onRemoveTag)}
            <Box direction="row">
              <Search color="brand" />
              <TextInput
                plain={true}
                placeholder="Search and Select Companies"
                type="search"
                value={this.state.query}
                onChange={this.handleStockChange}
                // name="ticker"
                suggestions={this.renderSuggestions() || []}
              />
            </Box>
          </Box>
          <Box align="start" pad="medium">
            <Button label="Create" onClick={this.addIndex} />
          </Box>
        </Box>
      </Card>
    );
  }
}

export default AddIndex;
