import React from 'react';

class UserAuth extends React.Component {
  state = {
    email: '',
    password: ''
  }

  onEmailChange = (event) => {
    let text = event.target.value;
    this.setState({email: text})
  }

  onPasswordChange = (even) => {
    let pass = event.target.value;
    this.setState({password: pass})
  }

  onSignup = (event) => {
    event.preventDefault()
    console.log('username? ', event.target.email.value)
    UserModel.create()
  }

  render() {
    return(
      <>
        <h1>Sign Up</h1>
        <form action="/signup" onSubmit={this.signup} >
            <input type="email" placeholder="Username" value={this.state.email} onChange={this.onEmailChange} />
            <input type="password" placeholder="Password" value={this.state.password} onChange={this.onPasswordChange} />
            <input type="submit" value="Signup" />
        </form>
        <h1>Login</h1>
        <form action="/login" method="POST">
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" value="Login" />
        </form>
      </>
    )
  }
}

export default UserAuth;
