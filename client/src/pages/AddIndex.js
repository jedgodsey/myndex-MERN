import React, { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Box, TextInput, Button, Text, Card } from "grommet";
import { Search } from 'grommet-icons';
import Tag from '../components/Tag';
import Tradier from '../models/tradier';
import MyndexModel from '../models/myndex';

const AddIndex = () => {
  const history = useHistory()
  const [query, setQuery] = useState('')
  const [list, setList] = useState([])
  const [selections, setSelections] = useState([])
  const [name, setName] = useState([])

  useEffect(() => {
    if (query) Tradier.populate(query)
      .then(data => setList(data))
  }, [query])

  //---------------- my functions ------------------
  const handleStockChange = (event) => {
    setQuery(event.target.value)
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const submitTicker = (ticker) => {
    let newTicker = selections.concat(ticker)
    setSelections(newTicker)
    setQuery('')
    setList([])
  }

  const addIndex = (event) => {
    MyndexModel.create({
      indexName: name,
      holdings: selections
    })
    setTimeout(() => history.push("/dashboard"), 500);
  }

  //------------------grommet functions--------------------
  const onRemoveTag = index => {
    const newTags = [...selections];
    newTags.splice(index, 1);
    setSelections(newTags)
  };

  const renderTags = (tags, onRemove) => {
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

  const renderSuggestions = () => {
    if (list && query) {
      return list.map((item, index, list) => ({
        label: (
          <Box
            direction="row"
            align="center"
            gap="small"
            border={index < list.length - 1 ? 'bottom' : undefined}
            pad="small"
            onClick={() => submitTicker(item.symbol)}
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

  return (
    <Card height="large" width="xlarge" background="light-1" elevation="medium">
      <Box margin="large" padding="medium">
        <strong>Create a New Index</strong>
        <TextInput
              // plain={true}
              placeholder="Enter The Name of Your Index"
              // type="search"
              value={name}
              onChange={handleNameChange}
              // name="indexName"
            />
        <Box direction="row" border="all">
          {selections.length > 0 && renderTags(selections, onRemoveTag)}
          <Box direction="row">
            <Search color="brand" />
            <TextInput
              plain={true}
              placeholder="Search and Select Companies"
              type="search"
              value={query}
              onChange={handleStockChange}
              // name="ticker"
              suggestions={renderSuggestions() || []}
            />
          </Box>
        </Box>
        <Box align="start" pad="medium">
          <Button label="Create" onClick={addIndex} />
        </Box>
      </Box>
    </Card>
  );
}

export default AddIndex;
