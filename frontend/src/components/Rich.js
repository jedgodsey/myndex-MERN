import React from 'react';
import { Card, Box, Chart, Stack, Text } from 'grommet';
import Tradier from '../models/tradier'



class Rich extends React.Component {

  labelY = () => {
    let yAxis = ['alpha', 'bravo', 'charlie', 'delta']
    return yAxis.map((y, index) => {
      const first = index === 0;
      const last = index === yAxis.length - 1 && !first;
      let align;
      if (first) {
        align = 'start';
      } else if (last) {
        align = 'end';
      } else {
        align = 'center';
      }
      return (
        <Box key={y} direction="row" align={align}>
          <Box pad={{ horizontal: 'small' }}>
            <Text>{y}</Text>
          </Box>
          <Box border="top" flex />
        </Box>
      );
    })
    this.setState()
  }
  render() {
    const chartProps = {
      size: { width: 'medium', height: 'small' },
      bounds: [[0, 100], [0, 100]],
      values:  [
        {
          "value": [0, 10],
          "label": "1"
        },
        {
          "value": [20, 30],
          "label": "2"
        },
        {
          "value": [30, 10],
          "label": "3"
        },
        {
          "value": [40, 50],
          "label": "4"
        },
        {
          "value": [50, 90],
          "label": "5"
        },
        {
          "value": [60, 10],
          "label": "6"
        },
      ],
      overflow: true,
    };
    return (
      <Card height="medium" width="large" background="light-1" elevation="medium">
        <Box align="center" pad="large">
          <Box
            direction="row"
            justify="between"
            width="medium"
            margin={{ vertical: 'small' }}
          >
            {['alpha', 'bravo', 'charlie', 'delta'].map(x => (
              <Text key={x}>{x}</Text>
            ))}
          </Box>
          <Stack guidingChild="last">
            <Box fill justify="between">
              {this.labelY}
            </Box>
            {/* <Chart
              {...chartProps}
              type="area"
              color={{ color: 'accent-1', opacity: 'medium' }}
              thickness="hair"
            /> */}
            <Chart
              {...chartProps}
              type="line"
              round
              color={{ color: 'brand', opacity: 'strong' }}
              thickness="hair"
              animate
            />
          </Stack>
        </Box>
      </Card>
    );
  }
};

Rich.story = {
  name: 'Animate',
  parameters: {
    chromatic: { disable: true },
  },
};

export default Rich;
