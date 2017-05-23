//setting database
const db = require('monk')('mongodb://jcr:car3118@ds149711.mlab.com:49711/guitar-methods')
const gm = db.get('gmethods')

module.exports = gm;