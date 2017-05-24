var express = require('express')

//setting database
var GM = require('../models/db-connect.js')

var router = express.Router();

/* GET methods page. */
router.get('/', (req, res) => {
    GM.find().sort({ likes : -1}).exec((err, gmList) => {
      if(!err) 
        res.render('temp-methods', {methList: gmList})
      else
        console.log('Error: ' + err + ' - retrieving methods.')
    })   
})

/* GET request to add a new method. */
router.get('/add', (req, res) => {
  GM.count((err, c) => {
    if(!err)
      res.render('temp-methods-add', {counter: c+1})
    else
      console.log('Error: ' + err + ' - counting methods.')
  })
})

/* GET request to store information from form. */
router.get('/store', (req, res) => {
  var myNewMethod = new GM(req.query)
  myNewMethod.save((err, myNewMethod) => {
    if(!err)
      console.log(req.query.name + " inserted.")
    else
      console.log("Insertion error: " + err)
  })
  res.redirect("/methods")
})

/* GET method single page. */
router.get('/:id', (req, res) => {
    GM.findOne({id: req.params.id}).then((doc) => {
      res.render('temp-method', {m: doc})
    }).catch((err) => {
      res.render('temp-method-notfound')
    })
})

/* DELETE a method. */
router.get('/del/:id', (req, res) => {
    GM.remove({id: req.params.id}, (err) => {
      if (!err)
        console.log('Method ' + req.params.id + ' was erased.')
      else
        console.log('ERROR: ' + err + 'while erasing method')
    })
    res.redirect("/methods")
})

module.exports = router
