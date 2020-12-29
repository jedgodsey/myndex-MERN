import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Grommet, Heading, Box, Footer, Button } from 'grommet';
import { Logout, BarChart, AddCircle, Google } from 'grommet-icons';
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
    console.log('whole response: ', response)
    let vitalInfo = response.profileObj;
    vitalInfo.tokenObj = response.tokenObj
    UserModel.test(vitalInfo)
    // UserModel.create(vitalInfo)
    this.setState({isLoggedIn: true})
  }

  logOut = () => {
    this.setState({isLoggedIn: false})
    console.log('logout successful')
  }

  showLinks = () => {
    if (this.state.isLoggedIn) {
      return(
        <>
          <Link to={`/dashboard`}><Button icon={<BarChart />} /></Link>
          <Link to={`/add`}><Button icon={<AddCircle />} /></Link>
          <Link to={`/`}><Button icon={<Logout />} /></Link>
          <GoogleLogout
            clientId='596122570478-46p3hq34dbpo5vb9vgdli4su95jpbjrd.apps.googleusercontent.com'
            buttonText='Logout'
            onLogoutSuccess={this.logOut}
            onFailure={() => console.log('logout failed!')}
            // ux_mode='redirect'
            // redirectUri={'/'}
            render={renderProps => (
              <Logout onClick={renderProps.onClick} disabled={renderProps.disabled} />
            )}
          />
        </>
      )
    }
    return(
      <GoogleLogin
        clientId='596122570478-46p3hq34dbpo5vb9vgdli4su95jpbjrd.apps.googleusercontent.com'
        buttonText='Login'
        onSuccess={this.responseGoogle}
        onFailure={() => console.log('login fail')}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        // ux_mode='redirect'
        // redirectUri={'/dashboard/'}
        render={renderProps => (
          <Google onClick={renderProps.onClick} disabled={renderProps.disabled} />
        )}
      />
    )
  }

  render() {
    return (
      <>
        <Grommet theme={theme}>
          <AppBar>
            <Box>
              <Link to={`/`}><Heading level='3' margin='none' color='accent-1'>
                MyNdex
              </Heading></Link>
              The Vision to See What Others Cannot
            </Box>
            <Box direction='row'>
              {this.showLinks()}
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
