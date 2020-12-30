import React from 'react';
import { Box } from 'grommet';
import Elevator from '../components/Elevator';
import Rich from '../components/Rich';

class Home extends React.Component {
  render() {
    return(
      <Box direction="row" wrap="true" justify="around">
        <Rich />
        <Elevator />
      </Box>
    )
  }
}

export default Home;
