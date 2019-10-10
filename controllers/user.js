let router = require('express').Router()
let db = require('../models')

// GET  profile
router.get('/:userId', (req,res) => {
  db.User.findOne({
    _id: req.params.id
  })
  .then((user) => {
    res.send({user})
  })
  .catch((err) => {
    console.log(`Error in GET/user/${req.params.id}`, err)
    res.status(503).send({ message: 'Something went wrong.' })
  })
})

router.get('/goats', (req,res) => {
  db.User.find({
    where: {
      isGoat: true
    }
  })
  .then((users) => {
    res.send({users})
  })
  .catch()
})

module.exports = router;