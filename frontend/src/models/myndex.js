const url = `http://localhost:4000/myndeces`

class MyndexModel {
  static all() {
    return fetch(url)
      .then(res => res.json())
      .catch(err => {
        console.log('error fetching data in MyndexModel.all: ', err)
        return {object: []};
      })
  }

  static getOne(id) {
    return fetch(`${url}/${id}`)
      .then(res => res.json())
      .catch(err => {
        console.log('error fetching data in MyndexModel.all: ', err)
        return {myndex: {}};
      })
  }

  static create(newMyndex) {
    return fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(newMyndex),
    })
      .then(res => res.json())
      .catch(err => {
        console.log('error fetching data in MyndexModel.create: ', err)
        return {message: 'error in create'};
      })
  }

  static update(updatedMyndex) {
    return fetch(`${url}/${updatedMyndex.id}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(updatedMyndex)
    })
      .then(res => console.log('this is your res: ', res.json()))
      .catch(err => {
        console.log('error fetching data in MyndexModel.update: ', err)
        return {message: 'error in update'};
      })
  }

  static delete(id) {
    fetch(`${url}/${id}`, {
      method: 'DELETE'
    })
      .then(res => res)
      .catch(err => {
        console.log('error fetching data in MyndexModel.delete: ', err)
        return {message: 'error in delete'};
      })
  }
}

export default MyndexModel;
