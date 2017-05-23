//displaying time on console
var date = require('date-and-time')
var now = new Date();
date.format(now, 'HH:mm')
console.log(now)

//reading JSON
const jf = require('jsonfile')
var aux = require("./functions/func-aux.js")

var myMethList = jf.readFileSync(__dirname + "/models/methods.json")
console.log("Method List loaded: " + myMethList.length + "methods")

//setting database
const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://jcr:car3118@ds149711.mlab.com:49711/guitar-methods', 
                     (err, database) => {
  if (!err) {
    db = database
    db.collection('gmethods')
    myMethList.forEach(function(element) {
      db.collection('gmethods').save(element, (err, result) => {
        if (!err) console.log(element + " was saved!")
        else console.log("Error: saving data...")
      })
    }, this);
  }
  else
    console.log("Connection to Mongo server unsuccessful.")
    
})
