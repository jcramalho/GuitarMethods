var express = require('express')

//setting database
var GM = require('../models/db-connect.js')

var router = express.Router();

/* GET like hit. */
router.get('/:id', (req, res) => {
    GM.findOneAndUpdate({id: req.params.id}, {$inc: {likes: 1}}).then((doc) => {
        console.log("User liked " + doc)
    }).catch((err) => {
      console.log("error: " + err + " - " + req.params.id)
    })
    res.redirect("/methods")
})

module.exports = router;
