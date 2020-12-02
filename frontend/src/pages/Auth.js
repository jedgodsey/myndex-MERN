import React, { useState } from 'react';
import axios from 'axios';

const Auth = () => {
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
    }).then(res => console.log('logout response: ', res))
  }

  return (
    <div>
      <div>
        <h1>register</h1>
        <input placeholder='username' onChange={e => setRegisterUsername(e.target.value)} />
        <input placeholder='password' onChange={e => setRegisterPassword(e.target.value)} />
        <button onClick={register}>Submit</button>
      </div>
      <div>
        <h1>login</h1>
        <input placeholder='username' onChange={e => setLoginUsername(e.target.value)} />
        <input placeholder='password' onChange={e => setLoginPassword(e.target.value)} />
        <button onClick={login}>Submit</button>
      </div>
      <div>
        <h1>get user</h1>
        <button onClick={getUser}>Submit</button>
        {data ? <h1>Welcome Back {data.username}!</h1> : null}
      </div>
      <div>
        <h1>log out</h1>
        <button onClick={logOut}>log out</button>
      </div>
    </div>
  )
}

export default Auth;
