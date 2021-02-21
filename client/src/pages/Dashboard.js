import React from 'react';
import { Box } from 'grommet';
import MyndexModel from '../models/myndex'
import IndexCard from '../components/IndexCard';

class Dashboard extends React.Component {
  state = {
    indices: []
  }

  componentDidMount() {
    this.fill()
  }

  fill = async () => {
    await MyndexModel.all().then(data => {
      this.setState({indices: data.indices})
    })
    const { history } = this.props
    if (this.state.indices.length === 0) {
      history.push('/add')
    }
  }

  render() {
    return(
      <Box direction="row" alignSelf="center" wrap="true">
        {this.state.indices && this.state.indices.map((item, i) => <IndexCard index={item} key={i} />)}
      </Box>
    )
  }
}

export default Dashboard;
