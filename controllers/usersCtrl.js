const db = require("../models");

// const show = (req, res) => {
//   console.log('user show params', req.params)
//   db.User.findById(req.params.id)
//     .then(foundUser => {
//       res.json({index: foundUser})
//     })
//     .catch(err => {
//       console.log('error in show user: ', err)
//       res.json({Error: 'unable to get data'})
//     })
// };


    //test new post
//     var newMonth = new Entry({date: '1997-10-30', link: 'https://wwww.youtube.com/'});
//     newMonth.save(function(err) {
//         if (err !== null) {
//             res.status(500).json({ error: "save failed", err: err});
//             return;
//         } else {
//             res.status(201).json(newMonth);
//         };
//     });
// });

const verify = (req, res) => {
  req.body.sessionID = req.sessionID
  db.User.findOneAndUpdate({googleID: req.body.googleID}, req.body, (err, foundUser) => {
    console.log('err: ', err)
    if (!err) {
      console.log('there')
      db.User.create(req.body)
        .then(res => console.log('then response: ', res))
        .catch(err => console.log('create user error: ', err))
    }
  }).catch(err => console.log('verify user error', err))

    // .catch(res => {
    //   console.log('in catch ', res)
    //   db.User.create(req.body)
    //     .then(savedUser => {
    //       console.log(savedUser)
    //       // res.json({game: savedMyndex})
    //     })
    //     .catch(err => {
    //       console.log('create user error: ', err)
    //       res.json({Error: 'unable to create data'})
    //     })
    // })
  console.log(res.status(200).json())
};


//-------------------------STILL NEED UPDATING BELOW-----------------------

// const update = (req, res) => {
//   db.Myndex.findByIdAndUpdate(req.params.id, req.body, {new: true})
//     .then(updatedMyndex => res.json({index: updatedMyndex}))
//     .catch(err => {
//       console.log('updatemyndex error: ', err)
//       res.json({Error: 'error updating myndex'})
//     })
// };

// const destroy = (req, res) => {
//   db.Myndex.findByIdAndDelete(req.params.id)
//     .then(deletedMyndex => res.json({index: deletedMyndex}))
//     .catch(err => {
//       console.log('deletegame error: ', err)
//       res.json({Error: 'unable to delete data'})
//     })
// };

module.exports = {
  verify,
  // update,
  // destroy
};
