let url;
if (process.env.NODE_ENV === 'production') {
  url = `https://secure-lowlands-61590.herokuapp.com/myndeces`;
} else {
  url = 'http://localhost:4000/myndeces';
}

class MyndexModel {
  static all() {
    return fetch(url, {credentials: 'include'})
      .then(res => res.json())
      .catch(err => {
        console.log('error fetching data in MyndexModel.all: ', err)
        return {object: []};
      })
  }

  static getOne(id) {
    return fetch(`${url}/${id}`, {credentials: 'include'})
      .then(res => res.json())
      .catch(err => {
        console.log('error fetching data in MyndexModel.getOne: ', err)
        return {myndex: {}};
      })
  }

  static create(newMyndex) {
    return fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newMyndex),
      credentials: 'include'
    })
      .then(res => window.location.href = '/dashboard')
  }

  static update(updatedMyndex) {
    return fetch(`${url}/${updatedMyndex.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedMyndex),
      credentials: 'include'
    })
      .then(res => console.log('this is your res: ', res.json()))
      .catch(err => {
        console.log('error fetching data in MyndexModel.update: ', err)
        return {message: 'error in update'};
      })
      .then(res => window.location.href = '/dashboard')
  }

  static delete(id) {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
      .then(res => res)
      .catch(err => {
        console.log('error fetching data in MyndexModel.delete: ', err)
        return {message: 'error in delete'};
      })
      .then(res => res.status === 200 ? window.location.href = '/dashboard' : null)
  }
}

export default MyndexModel;
