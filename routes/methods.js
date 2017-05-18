var express = require('express');
var jf = require('jsonfile')
var ml = require("../models/import.js")
var router = express.Router();

/* GET methods page. */
router.get('/', (req, res) => {
    res.render('temp-methods', {methList: ml})
})

/* GET request to add a new method. */
router.get('/add', (req, res) => {
  res.render('temp-methods-add', {counter: ml.length+1})
})

/* GET request to store information from form. */
router.get('/store', (req, res) => {
  ml.push(req.query)
  jf.writeFile("./models/methods.json", ml, function(err){
    if(err) console.error(err)
    else console.log("Database updated!")
  })
  res.redirect("/methods")
})

/* GET method single page. */
router.get('/:id', (req, res) => {
    var i = 0
    var found = false
    while((i < ml.length)&&(!found))
    {
        if (ml[i].id==req.params.id)
            found = true
        i++
    }
    if(found)
      res.render('temp-method', {m: ml[i-1]})
    else
      res.render('temp-method-notfound')
})

module.exports = router;
