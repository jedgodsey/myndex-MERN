import axios from 'axios';

let url;
if (process.env.NODE_ENV === 'production') {
  url = `https://secure-lowlands-61590.herokuapp.com/users`;
} else {
  url = 'http://localhost:4000/users';
}

class UserModel {

  static getOne(id) {
    return fetch(`${url}/${id}`, {credentials: 'include'})
      .then(res => res.json())
      .catch(err => {
        console.log('error fetching data in UserModel getOne: ', err)
        return {user: {}};
      })
  }

  static create(newUser) {
    return axios({
      method: 'POST',
      data: newUser,
      withCredentials: true,
      url: url
    })
      .then(res => res) //res.json())
      // .then(res => res.status === 200 ? window.location.href = '/dashboard' : null)
  }

  static login(newUser) {
    return fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUser),
    }).then(res => console.log('create res: ', res))
    .then(res => res.status === 200 ? window.location.href = '/dashboard' : null)
      .then(res => res.json())
      .catch(err => {
        console.log('error fetching data in UserModel.create: ', err)
        return {message: 'error in create'};
      })
  }

  static update(updatedUser) {
    return fetch(`${url}/${updatedUser.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedUser),
      credentials: 'include'
    })
      .then(res => console.log('this is your res: ', res.json()))
      .catch(err => {
        console.log('error fetching data in UserModel.update: ', err)
        return {message: 'error in update'};
      })
  }

  static delete(id) {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => res)
      .catch(err => {
        console.log('error deleting data in UserModel.delete: ', err)
        return {message: 'error in delete'};
      })
  }

  logOut = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:4000/logout'
    }).then(res => res.status === 200 ? window.location.href = '/' : null)
  }
}

export default UserModel;

/* {"data":{
    "user":{
      "_id":"5fe13bc7ba36201af2add6b9",
      "googleId":"117870007923179936562",
      "imageUrl":"https://lh3.googleusercontent.com/a-/AOh14Gg6Yy9C0nWjmNvm-J-WEIsI9k8duKXvkA3An7n4=s96-c",
      "email":"jed.godsey@gmail.com",
      "name":"Jed Godsey",
      "givenName":"Jed",
      "__v":0
    }
  },
  "status":200,
  "statusText":"OK",
  "headers":{
    "content-length":"256",
    "content-type":"application/json; charset=utf-8"
  },
  "config":{
    "url":"http://localhost:4000/users",
    "method":"post",
    "data":"{
      \"googleId\":\"117870007923179936562\",
      \"imageUrl\":\"https://lh3.googleusercontent.com/a-/AOh14Gg6Yy9C0nWjmNvm-J-WEIsI9k8duKXvkA3An7n4=s96-c\",
      \"email\":\"jed.godsey@gmail.com\",
      \"name\":\"Jed Godsey\",
      \"givenName\":\"Jed\",
      \"familyName\":\"Godsey\"
    }",
      "headers":{
        "Accept":"application/json, text/plain, *\/*",
        "Content-Type":"application/json;charset=utf-8"
      },
      "transformRequest":[null],
      "transformResponse":[null],
      "timeout":0,
      "withCredentials":true,
      "xsrfCookieName":"XSRF-TOKEN",
      "xsrfHeaderName":"X-XSRF-TOKEN",
      "maxContentLength":-1,
      "maxBodyLength":-1},
      "request":{}
    } */
