let db = require('../models');
let router = require('express').Router();


// Get All reviews
router.get('/', (req, res) => {
  db.Goat.find()
  .then(goats => {
    res.send({ goats })
  })
  .catch(err => {
    res.status(404).send({message: "Could not find Goats"})
  })
})

router.get('/:id', (req, res) => {
  db.Goat.findOne({id: req.params.id})
  .then(goat => {
    if(goat) {
      res.status(201).send({goat})
    }
    else {
      res.status(404).send({message: "resource not located" })
    }
  })
  .catch(err => {
    res.status(404).send({message: "Could not find the Goat you were looking for"})
  })
})

router.post('/:id', (req, res) => {
  db.Goat.create(req.body)
  .then(review => {
    res.status(201)
  })
  .catch(err => {
    res.status(500).send({message: "Failed posting the review"})
  })
})

router.put('/:id', (req, res) => {
  db.Goat.findOneAndUpdate({
    _id: req.params.id
  })
})

module.exports = router;
