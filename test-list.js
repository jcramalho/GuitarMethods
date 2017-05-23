//setting database
const db = require('monk')('mongodb://jcr:car3118@ds149711.mlab.com:49711/guitar-methods')
const gmethods = db.get('gmethods')
gmethods.find().then((docs) => {
    console.log(docs)
  })
  .then(() => db.close())
