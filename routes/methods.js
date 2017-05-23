var express = require('express')

//setting database
var gmethods = require('../models/db-connect.js')

var router = express.Router();

/* GET methods page. */
router.get('/', (req, res) => {
    gmethods.find().then((docs) => {
      res.render('temp-methods', {methList: docs})
  })   
})

/* GET request to add a new method. */
router.get('/add', (req, res) => {
  gmethods.count().then((c) => {
    res.render('temp-methods-add', {counter: c+1})
  })
})

/* GET request to store information from form. */
router.get('/store', (req, res) => {
  req.query.likes = Number(req.query.likes)
  gmethods.insert(req.query).then((docs) => {
    console.log(req.query.name + " inserted.")
  }).catch((err) => {
    console.log("Insertion error: " + err)
  })
  res.redirect("/methods")
})

/* GET method single page. */
router.get('/:id', (req, res) => {
    gmethods.findOne({id: req.params.id}).then((doc) => {
      res.render('temp-method', {m: doc})
    }).catch((err) => {
      res.render('temp-method-notfound')
    })
})

module.exports = router;
