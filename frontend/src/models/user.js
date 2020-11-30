const url = `http://localhost:4000/users`

class UserModel {

  static getOne(id) {
    return fetch(`${url}/${id}`)
      .then(res => res.json())
      .catch(err => {
        console.log('error fetching data in UserModel getOne: ', err)
        return {user: {}};
      })
  }

  static create(newUser) {
    return fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newUser),
    })
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
      body: JSON.stringify(updatedUser)
    })
      .then(res => console.log('this is your res: ', res.json()))
      .catch(err => {
        console.log('error fetching data in UserModel.update: ', err)
        return {message: 'error in update'};
      })
  }

  static delete(id) {
    fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
      .then(res => res)
      .catch(err => {
        console.log('error deleting data in UserModel.delete: ', err)
        return {message: 'error in delete'};
      })
  }
}

export default UserModel;
