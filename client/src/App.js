import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
// import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Grommet, Heading, Box, Footer, Button } from 'grommet';
import { Logout, BarChart, AddCircle } from 'grommet-icons';
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
  // state = {
  //   isLoggedIn: false
  // }
  
  // responseGoogle = (response) => {
  //   console.log('response: ', response)
  //   console.log('profile obj: ', response.profileObj);
  //   UserModel.verify(response.profileObj);
  // }

  logOut = () => {
    UserModel.logOut(); 
  }

  render() {
    return (
      <>
        <Grommet theme={theme}>
          <AppBar>
            {/* <GoogleLogin
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
            /> */}
            <Box>
              <Link to={`/`}><Heading level='3' margin='none' color='accent-1'>
                MyNdex
              </Heading></Link>
              The Vision to See What Others Cannot
            </Box>
            <Box direction='row'>
              <Link to={`/dashboard`}><Button icon={<BarChart />} /></Link>
              <Link to={`/add`}><Button icon={<AddCircle />} /></Link>
              <Link to={`/`}><Button icon={<Logout />} /></Link>
            </Box>
          </AppBar>
          <Box pad="large" height="95vh">
            <Switch>
              <Route path='/add' component={AddIndex} />
              <Route path='/dashboard' component={Dashboard} />
              <Route path='/' component={Home} />
            </Switch>
          </Box>
          <Footer height='large' background='brand' />
        </Grommet>
      </>
    );
  }
}

export default App;
