import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Grommet, Button, Heading } from 'grommet';
import { Notification } from 'grommet-icons';
import AppBar from './components/AppBar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddIndex from './pages/AddIndex';
import EditIndex from './pages/EditIndex';
import UserModel from './models/user';

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
  state = {
    isLoggedIn: false
  }
  
  responseGoogle = (response) => {
    console.log(response)
    console.log(response.profileObj);
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
            <Button icon={<Notification />} onClick={() => {}} />
          </AppBar>
          <Switch>
            <Route path='/add' component={AddIndex} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/signup' component={Dashboard} />
            <Route path='/login' component={Dashboard} />
            <Route path='/myndeces/:id/edit' component={EditIndex} />
            <Route path='/' component={Home} />
          </Switch>
        </Grommet>
      </>
    );
  }
}

export default App;
