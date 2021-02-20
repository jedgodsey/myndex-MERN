import React from 'react';
import { Card, Box, Chart, Stack, Text, Heading } from 'grommet';
import Tradier from '../models/tradier'
import MyndexModel from '../models/myndex';



class Show extends React.Component {

  state = {
    yAxis: [25, 50, 75, 100],
    xAxis: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
    data: [{"value": [0, 10]},{"value": [20, 30]},{"value": [30, 10]},{"value": [40, 50]},{"value": [50, 90]},{"value": [100, 10]},],
    bounds: [[0, 100], [0, 100]],
    holdings: [],
    name: ''
  }

  componentDidMount() {
    MyndexModel.getOne(this.props.match.params.id)
      .then(data => {
        this.run(data.index.holdings)
      })
    console.log(this.props.match.params)
    this.setState({
      holdings: this.props.match.params.holdings,
      name: this.props.match.params.name
    })
  }

  grab = async (stock) => {
    let begin = (Date.now() - (1000 * 3600 * 24 * 365))
    let start = new Date(begin)
    let open = start.getFullYear() + "-" + ('0' + (start.getMonth()+1)).slice(-2) + "-" + ('0' + start.getDate()).slice(-2)
    let response = await Tradier.tradierHistory(stock, open)
    let array = response.data.history.day.slice(-10).map(item => [item.date, item.close]) // change back to -30
    return Promise.all(array).then(res => res)
  }

  run = async (array) => {
    let allStats = []

    for (let i = 0; i < array.length; i++) {
      await this.grab(array[i]).then(res => {
        allStats.push(res)
      })
    }
   
    let dates = []
        for (let m = 0; m < allStats[0].length; m++) {
      dates.push([allStats[0][m][0]])
    }

    let averages = []

    for (let j = 0; j < allStats[0].length; j++) { //days
      let day = 0
      let calendar = ''
      for (let k = 0; k < allStats.length; k++) { //stocks
        day += allStats[k][j][1]
        calendar = allStats[k][j][0]
      }
      averages.push([calendar, day / allStats.length])
    }

    let finished = averages.map(item => ({"value": [new Date(item[0]).getTime(), item[1]]}))

    let minX = Math.min(...finished.map(item => item.value[0]))
    let maxX = Math.max(...finished.map(item => item.value[0]))
    let minY = Math.min(...finished.map(item => item.value[1]))
    let maxY = Math.max(...finished.map(item => item.value[1]))

    let levels = []
    for (let i = minY; i <= maxY; i += (maxY - minY) / 5) {
      levels.unshift(i.toPrecision(3))
    }

    let zones = []
    let oneDay = 1000 * 60 * 60 * 24
    for (let i = 0; i < finished.length; i++) {
      zones.push(new Date(finished[i].value[0] + oneDay).toLocaleString('default', { weekday: 'short' }).slice(0,2))
    }

    this.setState({
      data: finished,
      bounds: [[minX, maxX], [minY, maxY]],
      yAxis: levels,
      xAxis: zones
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
        <Box key={index} direction="row" align={align}>
          <Box pad={{ horizontal: 'small' }}>
            <Text>{y}</Text>
          </Box>
          <Box border="top" flex />
        </Box>
      );
    })
  }

  labelX = () => {
    return this.state.xAxis.map((x, index) => (<Text key={index}>{x}</Text>))
  }
  render() {
    const chartProps = {
      size: { width: 'large', height: 'large' },
      bounds: this.state.bounds,
      values:  this.state.data,
      overflow: true,
    };
    return (
      <Box align="center" gap="large">
        <Card width="xlarge" background="light-1" elevation="medium">
        <Heading level='2' margin='medium' pad='medium'>{this.state.name}</Heading>
        <Heading level='3' margin='medium' pad='medium'>Components: {this.state.holdings}</Heading>
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
              <Chart
                {...chartProps}
                type="area"
                color={{ color: 'accent-1', opacity: 'medium' }}
                thickness="hair"
                animate
              />
              <Chart
                {...chartProps}
                type="line"
                round
                color={{ color: 'brand', opacity: 'strong' }}
                thickness="xsmall"
                // animate
              />
            </Stack>
          </Box>
        </Card>
      </Box>
    );
  }
};

Show.story = {
  name: 'Animate',
  parameters: {
    chromatic: { disable: true },
  },
};

export default Show;
