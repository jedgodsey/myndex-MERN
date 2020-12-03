import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Grommet, Heading, Box } from 'grommet';
import AppBar from './components/AppBar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddIndex from './pages/AddIndex';
import UserModel from './models/user';

const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

class App extends React.Component {
  state = {
    isLoggedIn: false
  }
  
  responseGoogle = (response) => {
    console.log('response: ', response)
    console.log('profile obj: ', response.profileObj);
    UserModel.create(response.profileObj);
  }

  logout = () => {
    this.setState( { isLoggedIn: false } ) 
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
            <GoogleLogout
              clientId='596122570478-46p3hq34dbpo5vb9vgdli4su95jpbjrd.apps.googleusercontent.com'
              buttonText='Logout'
              onLogoutSuccess={this.logout}
            />
            <Heading level='3' margin='none'>MyNdex</Heading>
            {/* <Button icon={<Notification />} onClick={() => {}} /> */}
          </AppBar>
          <Box>
            <Switch>
              <Route path='/add' component={AddIndex} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/' component={Home} />
            </Switch>
          </Box>
        </Grommet>
      </>
    );
  }
}

export default App;
