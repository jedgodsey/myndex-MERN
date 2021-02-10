import React from 'react';
import { Box } from 'grommet';
import Elevator from '../components/Elevator';
import Rich from '../components/Rich';

class Home extends React.Component {
  render() {
    return(
      <Box align="center" gap="large">
        <Rich />
        <Elevator />
      </Box>
    )
  }
}

export default Home;
