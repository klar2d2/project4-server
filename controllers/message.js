const router = require('express').Router();
const db = require('../models')

router.get('/', (req, res) => {
   db.Message.find({
       userId: req.body.userId,
       goatId: req.body.goatId
   })
   .then(response => {
       res.send(response)
   })
   .catch(err => {
       console.log(err)
   })
})

module.exports = router;
