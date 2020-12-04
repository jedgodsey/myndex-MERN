import React from 'react';
import { Card, Box, Chart, Stack, Text, Heading } from 'grommet';
import Tradier from '../models/tradier'



class SmallRich extends React.Component {
  state = {
    yAxis: ['alpha', 'bravo', 'charlie', 'delta'],
    xAxis: ['alpha', 'bravo', 'charlie', 'delta'],
    data: [{"value": [0, 10]},{"value": [20, 30]},{"value": [30, 10]},{"value": [40, 50]},{"value": [50, 90]},{"value": [60, 10]},],
    bounds: [[0, 100], [0, 100]]
  }

  componentDidMount() {
    this.getData('CRM')
  }

  getData = async (ticker) => {
    let res = await Tradier.tradierHistory(ticker)
    let points = res.data.history.day.map(item => ({"value": [new Date(item.date).getTime(), item.close]}))
    let minX = Math.min(...points.map(item => item.value[0]))
    let maxX = Math.max(...points.map(item => item.value[0]))
    let minY = Math.min(...points.map(item => item.value[1]))
    let maxY = Math.max(...points.map(item => item.value[1]))
    this.setState({
      data: points,
      bounds: [[minX, maxX], [minY, maxY]]
    })
  }

  labelY = () => {
    return this.state.yAxis.map((y, index) => {
      const first = index === 0;
      const last = index === this.state.yAxis.length - 1 && !first;
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
  }

  labelX = () => {
    return this.state.xAxis.map(x => (<Text key={x}>{x}</Text>))
  }
  render() {
    console.log(this.state.bounds)
    const chartProps = {
      size: { width: 'large', height: 'medium' },
      bounds: this.state.bounds,
      values:  this.state.data,
      overflow: true,
    };
    return (
      <Box align="center" pad="large">
        <Box
          direction="row"
          justify="between"
          width="large"
          margin={{ vertical: 'small' }}
        >
          {this.labelX()}
        </Box>
        <Stack guidingChild="last">
          <Box fill justify="between">
            {this.labelY()}
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
            thickness="xsmall"
            animate
          />
        </Stack>
      </Box>
    );
  }
};

Rich.story = {
  name: 'Animate',
  parameters: {
    chromatic: { disable: true },
  },
};

export default SmallRich;
