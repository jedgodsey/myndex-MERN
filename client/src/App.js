import React, { useState } from 'react';
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { Grommet, Heading, Box, Footer, Button } from 'grommet';
import { Logout, BarChart, AddCircle, Google, Home } from 'grommet-icons';
import AppBar from './components/AppBar';
import MyndexHome from './pages/Home';
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

const App = () => {
  let history = useHistory();

  const [user, setUser] = useState(false)
  
  const responseGoogle = (response) => {
    console.log('whole response: ', response)
    let vitalInfo = response.profileObj;
    vitalInfo.tokenObj = response.tokenObj
    UserModel.test(vitalInfo)
    setUser(true)
    history.push("/dashboard")
  }

  const logOut = () => {
    setUser(false)
    console.log('logout successful')
    history.push("/")
  }

  const showLinks = () => {
    if (user) {
      return(
        <>
          <div className="nav-link"><Link to={`/dashboard`}><Button icon={<BarChart />} /><div className="nav-title">View</div></Link></div>
          <div className="nav-link"><Link to={`/add`}><Button icon={<AddCircle />} /><div className="nav-title">Create</div></Link></div>
          <div className="nav-link"><Link to={`/`}><Button icon={<Home />} /><div className="nav-title">Home</div></Link></div>
          <GoogleLogout
            clientId='596122570478-46p3hq34dbpo5vb9vgdli4su95jpbjrd.apps.googleusercontent.com'
            buttonText='Logout'
            onLogoutSuccess={logOut}
            onFailure={() => console.log('logout failed!')}
            render={renderProps => (
              <div className="nav-link" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                <Button icon={<Logout />} />
                <div className="nav-title">Log Out</div>
              </div>
            )}
          />
        </>
      )
    }
    return(
      <GoogleLogin
        clientId='596122570478-46p3hq34dbpo5vb9vgdli4su95jpbjrd.apps.googleusercontent.com'
        buttonText='Login'
        onSuccess={responseGoogle}
        onFailure={() => console.log('login fail')}
        cookiePolicy={'single_host_origin'}
        isSignedIn={true}
        render={renderProps => (
          <div className="nav-link" onClick={renderProps.onClick} disabled={renderProps.disabled}>
            <Google />
            <div className="nav-title">Sign In</div>
          </div>
        )}
      />
    )
  }

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
            {showLinks()}
          </Box>
        </AppBar>
        <Box pad="large" height="95vh">
          <Switch>
            <Route path='/add' component={AddIndex} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/' component={MyndexHome} />
          </Switch>
        </Box>
        <Footer height='large' background='brand' />
      </Grommet>
    </>
  );
}

export default App;
