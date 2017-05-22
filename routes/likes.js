var express = require('express');
var jf = require('jsonfile')
var ml = require("../models/import.js")
var aux = require("../functions/func-aux.js")

var router = express.Router();

/* GET like hit. */
router.get('/:id', (req, res) => {
    var i = 0
    var answer = ""
    var found = false
    while((i < ml.length)&&(!found))
    {
        if (ml[i].id==req.params.id)
        {
            found = true
            ml[i].likes++
        }
        i++
    }
    if(found)
    {
        answer = "user likes (" + ml[i-1].likes + ")"
        jf.writeFile("./models/methods.json", ml, function(err){
            if(err)
              console.log("Escrita no servidor: "+err)
            else
              console.log("Database updated!")
            ml.sort(aux.mySort('likes', true, parseInt))
        })
    }    
    else
      answer = "error: user liked inexistent method!"
    
    console.log(answer)
    res.redirect("/methods")
})

module.exports = router;
