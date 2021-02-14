import React from 'react';
import { Box } from 'grommet';
import MyndexModel from '../models/myndex'
import IndexCard from '../components/IndexCard';

class Dashboard extends React.Component {
  state = {
    indices: []
  }

  componentDidMount() {
    MyndexModel.all().then(data => {
      console.log("that data: ", data)
      this.setState({indices: data.indices})
    })
  }
  render() {
    return(
      <Box direction="row" alignSelf="center" wrap="true" /*flex="true"*/ >
        {this.state.indices && this.state.indices.map((item, i) => <IndexCard index={item} key={i} />)}
      </Box>
    )
  }
}

export default Dashboard;
