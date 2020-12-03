import React from 'react';
import { Box } from 'grommet';
import AuthBox from '../components/AuthBox';
import Guide from '../components/Guide';
import AnimatedChart from '../components/AnimatedChart';
import Rich from '../components/Rich';

class Home extends React.Component {
  render() {
    return(
      <Box direction="row-responsive">
        <Guide />
        <AuthBox />
        <AnimatedChart />
        <Rich />
      </Box>
    )
  }
}

export default Home;
