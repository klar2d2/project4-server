let router = require('express').Router()
let db = require('../models')

// GET  profile
router.get('/:userId', (req,res) => {
  db.User.findOne({
    _id: req.params.id
  })
  .then((user) => {
    if (user.isGoat) {
      
    }
  })
  .catch((err) => {
    console.log(`Error in GET/user/${req.params.id}`, err)
    res.status(503).send({ message: 'Something went wrong.' })
  })
})

module.exports = router;