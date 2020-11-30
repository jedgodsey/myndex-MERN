import React from 'react';
import { Route, Switch } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { Grommet, Button, Heading } from 'grommet';
import { Notification } from 'grommet-icons';
import AppBar from './components/AppBar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddIndex from './pages/AddIndex';
import EditIndex from './pages/EditIndex';
import TestIndex from './pages/TestIndex';

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

class App extends React.Component {
  responseGoogle = (response) => {
    console.log(response)
    console.log(response.profileObj);
  }
  render() {
    return (
      <>
        <Grommet theme={theme}>
          <AppBar>
            <GoogleLogin
              clientId='596122570478-46p3hq34dbpo5vb9vgdli4su95jpbjrd.apps.googleusercontent.com'
              buttonText='Login'
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
              cookiePolicy={'single_host_origin'}
            />
            <Heading level='3' margin='none'>MyNdex</Heading>
            <Button icon={<Notification />} onClick={() => {}} />
          </AppBar>
          <Switch>
            <Route path='/add' component={AddIndex} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/test' component={TestIndex} />
            <Route path='/myndeces/:id/edit' component={EditIndex} />
            <Route path='/' component={Home} />
          </Switch>
        </Grommet>
      </>
    );
  }
}

export default App;
