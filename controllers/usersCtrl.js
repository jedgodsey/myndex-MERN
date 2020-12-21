const db = require("../models");

const create = (req, res) => {
  db.User.create(req.body)
    .then(newUser => {
      res.json({user: newUser})
    })
    .catch(err => {
      console.log('error in create user: ', err)
      res.json({Error: 'unable to create data'})
    })
};

const show = (req, res) => {
  db.User.findById(req.params.id)
    .then(foundUser => {
      res.json({user: foundUser})
    })
    .catch(err => {
      console.log('error in show user: ', err)
      res.json({Error: 'unable to get data'})
    })
};

const update = (req, res) => {
  db.Myndex.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatedUser => res.json({user: updatedUser}))
    .catch(err => {
      console.log('updateuser error: ', err)
      res.json({Error: 'error updating user'})
    })
};

const destroy = (req, res) => {
  db.Myndex.findByIdAndDelete(req.params.id)
    .then(deletedUser => res.json({user: deletedUser}))
    .catch(err => {
      console.log('deleteuser error: ', err)
      res.json({Error: 'unable to delete data'})
    })
};

module.exports = {
  create,
  show,
  update,
  destroy
};
