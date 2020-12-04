import React, { useState } from 'react';
import axios from 'axios';
import { Button, Card, CardHeader, CardFooter, CardBody, FormField, TextInput, Box } from 'grommet';
// import { Hide, View } from 'grommet-icons';

const AuthBox = () => {
  const [registerUsername, setRegisterUsername] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [data, setData] = useState(null)
  const [reveal, setReveal] = React.useState(false);

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
      .then(res => res.status === 200 ? window.location.href = '/dashboard' : null)
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
      .then(res => res.status === 200 ? window.location.href = '/dashboard' : null)
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
    }).then(res => res.status === 200 ? window.location.href = '/' : null)
  }

  return (
    <Box gap='large'>
      <Card height="medium" width="medium" background="light-1" elevation="medium">
        <CardHeader pad="small">Sign In...</CardHeader>
        <CardBody pad="medium">
          <FormField name="name" htmlfor="text-input-id" label="Name">
            <TextInput id="text-input-id" name="name" onChange={e => setLoginUsername(e.target.value)} />
          </FormField>
          <FormField name="password" htmlfor="text-input-id" label='Password'>
              <TextInput id="text-input-id" type={reveal ? 'text' : 'password'} name="name" onChange={e => setLoginPassword(e.target.value)} />
          </FormField>

          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Submit" onClick={login} />
          </Box>
        </CardBody>
        <CardFooter pad={{horizontal: "small"}} background="light-2">   
        </CardFooter>
      </Card>


      <Card height="medium" width="medium" background="light-1" elevation="medium">
      <CardHeader pad="small">..or Sign Up!</CardHeader>
        <CardBody pad="medium">
          <FormField name="name" htmlfor="text-input-id" label="Name">
            <TextInput id="text-input-id" name="name" onChange={e => setRegisterUsername(e.target.value)} />
          </FormField>
          <FormField name="password" htmlfor="text-input-id" label="Password">
              <TextInput id="text-input-id" type={reveal ? 'text' : 'password'} name="name" onChange={e => setRegisterPassword(e.target.value)} />
          </FormField>
          <FormField name="password" htmlfor="text-input-id" label="Re-Enter Password">
              <TextInput id="text-input-id" type={reveal ? 'text' : 'password'} name="name" onChange={e => setRegisterPassword(e.target.value)} />
          </FormField>
          <Box direction="row" gap="medium">
            <Button type="submit" primary label="Submit" onClick={register} />
          </Box>
          {/* <div>
            <input placeholder='username' onChange={e => setRegisterUsername(e.target.value)} />
            <input placeholder='password' onChange={e => setRegisterPassword(e.target.value)} />
            <button onClick={register}>Submit</button>
          </div>
          <div>
            <p>login</p>
            <input placeholder='username' onChange={e => setLoginUsername(e.target.value)} />
            <input placeholder='password' onChange={e => setLoginPassword(e.target.value)} />
            <button onClick={login}>Submit</button>
          </div> */}
          {/* <div>
            <p>get user</p>
            <button onClick={getUser}>Submit</button>
            {data ? <h1>Welcome Back {data.username}!</h1> : null}
          </div> */}
          {/* <div>
            <p>logout</p>
            <button onClick={logOut}>log out</button>
          </div>         */}
        </CardBody>
        <CardFooter pad={{horizontal: "small"}} background="light-2">   
        </CardFooter>
      </Card>
    </Box>
  )
}

export default AuthBox;
