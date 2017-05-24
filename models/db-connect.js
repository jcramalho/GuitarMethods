//setting database
var mongoose = require('mongoose');
mongoose.connect('mongodb://jcr:car3118@ds149711.mlab.com:49711/guitar-methods');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are connected to Mongo.")
});

var gmSchema = mongoose.Schema({
    id: String,
    date: String,
    likes: Number,
    name: String,
    url: String,
    aname: String,
    aurl: String,
    experience: String
});

var GMethod = mongoose.model('GMethod', gmSchema);

module.exports = GMethod;