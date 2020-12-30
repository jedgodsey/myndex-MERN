import axios from 'axios';

let url;
if (process.env.NODE_ENV === 'production') {
  url = `https://secure-lowlands-61590.herokuapp.com/login`;
} else {
  url = 'http://localhost:4000/login';
}

class AuthModel {
  static test(newUser) {
    return axios({
      method: 'POST',
      data: newUser,
      withCredentials: true,
      url: url
    })
  }
}

export default AuthModel;
