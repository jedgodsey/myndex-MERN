import React from 'react';
import { Box, Chart, Stack, Text } from 'grommet';
import Tradier from '../models/tradier'



class SmallRich extends React.Component {
  state = {
    yAxis: [25, 50, 75, 100],
    xAxis: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
    data: [{"value": [0, 10]},{"value": [20, 30]},{"value": [30, 10]},{"value": [40, 50]},{"value": [50, 90]},{"value": [100, 10]},],
    bounds: [[0, 100], [0, 100]],
    calls: []
  }

  componentDidMount() {
    this.run(this.props.holdings)
  }

  // getData = async (ticker) => {
  //   console.log('getting')
  //   let res = await Tradier.tradierHistory(ticker)
  //   let points = res.data.history.day.map(item => ({"value": [new Date(item.date).getTime(), item.close]}))
  //   let minX = Math.min(...points.map(item => item.value[0]))
  //   let maxX = Math.max(...points.map(item => item.value[0]))
  //   let minY = Math.min(...points.map(item => item.value[1]))
  //   let maxY = Math.max(...points.map(item => item.value[1]))
    
  //   let levels = []
  //   // for (let i = Math.floor(points.length * .2); i < points.length; i += Math.floor(points.length * .19)) {
  //   //   levels.unshift(points[i].value[1].toPrecision(3))
  //   // }
  //   for (let i = minY; i <= maxY; i += (maxY - minY) / 5) {
  //     levels.unshift(i.toPrecision(3))
  //     console.log("levels: ", levels)
  //   }

  //   let zones = []
  //   for (let i = 1; i < points.length; i += 30) {
  //     zones.push(new Date(points[i].value[0]).toLocaleString('default', { month: 'long' }))
  //   }
  //   this.setState({
  //     data: points,
  //     bounds: [[minX, maxX], [minY, maxY]],
  //     yAxis: levels,
  //     xAxis: zones
  //   })
  // }

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
        for (let m = 0; m < allStats[0].length; m++) { // figure out allStats[0].length
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
      size: { width: 'large', height: 'small' },
      bounds: this.state.bounds,
      values:  this.state.data,
      overflow: true,
    };

    // console.log(this.props)
    return (
        <Box align="center" width='medium' height='small'>
          <Box
            direction="row"
            justify="between"
            width="medium"
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
              thickness="hair"
              animate
            />
          </Stack>
        </Box>
    );
  }
};

SmallRich.story = {
  name: 'Animate',
  parameters: {
    chromatic: { disable: true },
  },
};

export default SmallRich;
