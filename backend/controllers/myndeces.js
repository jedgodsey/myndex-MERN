const db = require("../models");

const display = (req, res) => {
  db.Myndex.find({})
    .then(foundIndeces => {
      console.log('display res: ', res)
      res.json({indeces: foundIndeces})
    })
    .catch(err => {
      console.log('myndex index error: ', err)
      res.json({Error: 'unable to get your data'})
    })
};

const show = (req, res) => {
  db.Myndex.findById(req.params.id)
    .then(foundMyndex => {
      res.json({index: foundMyndex})
    })
    .catch(err => {
      console.log('error in show game: ', err)
      res.json({Error: 'unable to get data'})
    })
};

const create = (req, res) => {
  db.Myndex.create(req.body)
    .then(savedMyndex => {
      console.log(savedMyndex)
      // res.json({game: savedMyndex})
    })
    .catch(err => {
      console.log('creategame error: ', err)
      res.json({Error: 'unable to create data'})
    })
};

// const update = (req, res) => {
//   db.Game.findByIdAndUpdate(req.params.id, req.body, {new: true})
//     .then(updatedGame => res.json({game: updatedGame}))
//     .catch(err => {
//       console.log('updategame error: ', err)
//       res.json({Error: 'error updating game'})
//     })
// };

// const destroy = (req, res) => {
//   db.Game.findByIdAndDelete(req.params.id)
//     .then(deletedGame => res.json({game: deletedGame}))
//     .catch(err => {
//       console.log('deletegame error: ', err)
//       res.json({Error: 'unable to delete data'})
//     })
// };

module.exports = {
  display,
  show,
  create,
  // update,
  // destroy,
};
