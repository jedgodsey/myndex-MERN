import React from "react";
import { Box, Grommet } from "grommet";
import TagSelect from "../components/TagSelect";

const allTags = [
  "enterprise",
  "grommet",
  "java",
  "javascript",
  "react",
  "ux",
  "ui"
];

class TestIndex extends React.Component {
  state = {
    tags: ["grommet"]
  };
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
  render() {
    const { tags } = this.state;
    return (
      <Grommet>
        <Box>
          <TagSelect
            value={tags}
            suggestions={allTags.sort()
              .filter(item => !tags.includes(item))}
            onSelect={this.onSelectTag}
            onRemove={this.onRemoveTag}
          />
        </Box>
      </Grommet>
    );
  }
}

export default TestIndex;
