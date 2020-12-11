import React from 'react';
import { Box } from 'grommet';
import AuthBox from '../components/AuthBox';
// import Guide from '../components/Guide';
import Rich from '../components/Rich';

class Home extends React.Component {
  render() {
    return(
      <Box direction="row-responsive" gap="large">
        {/* <Guide /> */}
        <Rich />
        <AuthBox />
      </Box>
    )
  }
}

export default Home;
