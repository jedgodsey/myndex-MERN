import React from 'react';
import { Box } from 'grommet';
import MyndexModel from '../models/myndex'
import IndexCard from '../components/IndexCard';

class Dashboard extends React.Component {
  state = {
    indeces: []
  }

  componentDidMount() {
    MyndexModel.all().then(data => {
      this.setState({indeces: data.indeces})
    })
  }
  render() {
    return(
      <Box direction="row" flex="true" alignContent="between">
        {this.state.indeces && this.state.indeces.map(item => <IndexCard index={item} />)}
      </Box>
    )
  }
}

export default Dashboard;
