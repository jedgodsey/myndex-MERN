const db = require("../models");

const authenticate = (req, res) => {
  console.log('your request user: ', req.user)
  db.User.findOne({email: req.body.email})
    .then(foundUser => {
      if (foundUser) {
        db.User.findByIdAndUpdate(foundUser.id, req.body)
          .then(updatedUser => res.json({user: updatedUser}))
          .catch(err => {
            console.log('error in update user: ', err)
            res.json({Error: 'unable to update data'})
          })
      } else {
        db.User.create(req.body)
          .then(newUser => {
            res.json({user: newUser})
          })
          .catch(err => {
            console.log('error in create user: ', err)
            res.json({Error: 'unable to create data'})
          })
      }
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

const destroy = (req, res) => {
  db.Myndex.findOneAndDelete({email: req.body.email})  //findByIdAndDelete(req.params.id)
    .then(deletedUser => res.json({user: deletedUser}))
    .catch(err => {
      console.log('deleteuser error: ', err)
      res.json({Error: 'unable to delete data'})
    })
};

module.exports = {
  authenticate,
  show,
  destroy
};
