import axios from 'axios';
const url = `http://localhost:4000/users`

class UserModel {

  static getOne(id) {
    return fetch(`${url}/${id}`, {credentials: 'include'})
      .then(res => res.json())
      .catch(err => {
        console.log('error fetching data in UserModel getOne: ', err)
        return {user: {}};
      })
  }

  static verify(newUser) {
    axios({
      method: 'POST',
      data: newUser,
      withCredentials: true,
      url: `${url}/verify`
    }).then(res => res.status === 200 ? window.location.href = '/dashboard' : null)
  }

  // static create(newUser) {
  //   console.log('trying to fetch')
  //   return fetch(url, {
  //     method: 'POST',
  //     headers: {'Content-Type': 'application/json'},
  //     body: JSON.stringify(newUser),
  //   }).then(res => console.log('create res: ', res))
  //   .then(res => res.status === 200 ? window.location.href = '/dashboard' : null)
  //     .then(res => res.json())
  //     .catch(err => {
  //       console.log('error fetching data in UserModel.create: ', err)
  //       return {message: 'error in create'};
  //     })
  // }

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
