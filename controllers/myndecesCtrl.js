const express = require('express');
const passport = require('passport');
const db = require("../models");

const display = (req, res) => {
  db.Myndex.find({})
    .then(foundIndices => {
      return res.json({indices: foundIndices})
    })
    .catch(err => {
      console.log('myndex display error: ', err)
      res.json({Error: 'unable to get your data'})
    })
};

const show = (req, res) => {
  db.Myndex.findById(req.params.id)
    .then(foundMyndex => {
      res.json({index: foundMyndex})
    })
    .catch(err => {
      console.log('error in show myndex: ', err)
      res.json({Error: 'unable to get data'})
    })
};

const create = (req, res) => {
  let freshIndex = req.body
  freshIndex.maker = req.headers.cookie
  console.log('cookies: ', req.headers.cookie)
  db.Myndex.create(freshIndex)
    .then(savedMyndex => {
      console.log(savedMyndex)
    })
    .catch(err => {
      console.log('creategame error: ', err)
      res.json({Error: 'unable to create data'})
    })
};

const update = (req, res) => {
  db.Myndex.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatedMyndex => res.json({index: updatedMyndex}))
    .catch(err => {
      console.log('updatemyndex error: ', err)
      res.json({Error: 'error updating myndex'})
    })
};

const destroy = (req, res) => {
  db.Myndex.findByIdAndDelete(req.params.id)
    .then(deletedMyndex => res.json({index: deletedMyndex}))
    .catch(err => {
      console.log('deletegame error: ', err)
      res.json({Error: 'unable to delete data'})
    })
};

module.exports = {
  display,
  show,
  create,
  update,
  destroy,
};
