import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, CardHeader, CardFooter, CardBody } from 'grommet';

const AuthBox = () => {
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [data, setData] = useState(null)

  const register = () => {
    axios({
      method: 'POST',
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: 'http://localhost:4000/register'
    })
      .then(res => console.log(res)) // res.status === 200 ? window.location.href = '/dashboard' : null)
  }

  const login = () => {
    axios({
      method: 'POST',
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: 'http://localhost:4000/login'
    })
      .then(res => console.log(res)) // res.status === 200 ? window.location.href = '/dashboard' : null)
  };

  const getUser = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/getUser'
    }).then(res => {
      setData(res.data)
      console.log(res.data)
    });
  };

  const logOut = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/logout'
    }).then(res => console.log(res)) // window.location.href = '/loggedout')
  }

  return (
    <Card height="large" width="medium" background="light-1" elevation="medium">
      <CardHeader pad="medium">Register</CardHeader>
      <CardBody pad="medium">
        <div> {/* className="App" ? */}
          <input placeholder='username' onChange={e => setRegisterUsername(e.target.value)} />
          <input placeholder='password' onChange={e => setRegisterPassword(e.target.value)} />
          <button onClick={register}>Submit</button>
        </div>
        <div>
          <p>login</p>
          <input placeholder='username' onChange={e => setLoginUsername(e.target.value)} />
          <input placeholder='password' onChange={e => setLoginPassword(e.target.value)} />
          <button onClick={login}>Submit</button>
        </div>
        <div>
          <p>get user</p>
          <button onClick={getUser}>Submit</button>
          {data ? <h1>Welcome Back {data.username}!</h1> : null}
        </div>
        <div>
          <p>logout</p>
          <button onClick={logOut}>log out</button>
        </div>        
      </CardBody>
      <CardFooter pad={{horizontal: "small"}} background="light-2">   
      </CardFooter>
    </Card>
  )
}

export default AuthBox;
