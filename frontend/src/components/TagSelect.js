import React from "react";

import { Box, TextInput } from "grommet";

import Tag from "./Tag";

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

export default class TagSelect extends React.Component {
  static defaultProps = {
    suggestions: [],
    value: []
  };
  state = {
    search: ""
  };
  render() {
    const { suggestions, value, onRemove, onSelect } = this.props;
    const { search } = this.state;
    return (
      <Box
        direction="row"
        border="all"
      >
        {value.length > 0 && renderTags(value, onRemove)}
        <Box>
          <TextInput
            plain={true}
            placeholder="Select tags"
            type="search"
            value={search}
            onChange={({ target: { value: search } }) =>
              this.setState({ search })
            }
            onSelect={({ suggestion }) =>
              this.setState(
                {
                  search: ""
                },
                () => onSelect(suggestion)
              )
            }
            suggestions={suggestions.filter(suggestion =>
                suggestion.indexOf(search) >= 0)}
          />
        </Box>
      </Box>
    );
  }
}
