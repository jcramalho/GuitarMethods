//module to read JSON
const jf = require('jsonfile')
var aux = require("../functions/func-aux.js")

var myMethList = jf.readFileSync(__dirname + "/methods.json")
console.log("Method List loaded: " + myMethList.length + "methods")
myMethList.sort(aux.mySort('likes', true, parseInt))
console.log("Method List sorted.")
module.exports = myMethList;