import React from 'react';
import { Grommet, Button, Heading } from 'grommet';
import { Notification } from 'grommet-icons';
import AppBar from './components/AppBar';

const theme = {
  global: {
    colors: {
      brand: '#228BE6'
    },
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

function App() {
  return (
    <Grommet theme={theme}>
      <AppBar>
        <Heading level='3' margin='none'>MyNdex</Heading>
        <Button icon={<Notification />} onClick={() => {}} />
      </AppBar>
    </Grommet>
  );
}

export default App;
