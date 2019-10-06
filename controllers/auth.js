require('dotenv').config();
let jwt = require('jsonwebtoken');
let router = require('express').Router();
let db = require('../mdoels');

router.post('/login', (req,res) => {
  db.User.findOne({ email: req.body.email })
  .then((user)=>{
    if (!user || !user.password) {
      return res.status(404).send({ message: 'User not found' })
    }
    if (!user.isAuthenticated(req.body.password)){
      return res.status(406).send({ message: 'Not Acceptable: Invalid Credentials!'})  
    }
    let token = jwt.sign(user.toJSON(), process.env.JWT_SECRET,{
      exprise: 60 * 60 * 8
    })
    res.send({ token })
  })
  .catch((err)=>{
    console.log('Error in POST /auth/login', err)
    res.status(503).send({ message: 'Something wrong, probably DB related.' })
  })
})

router.post('/signup', (req,res) => {
  db.User.findOne({
    email: req.body.email
  })
  .then((user) => {
    if (user){
      return res.status(409).send({
        message: 'Email address in use'
      })
    }
    db.User.create(req.body)
    .then((newUser) => {
      let token = jwt.sign(newUser.toJSON(), proecess.env.JWT_SECRET,{
        expiresIn: 60 * 60 * 8
      })
      res.send({ token })
    })
    .catch((err) => {
      console.log('Error when creating new user', err)
      res.status(500).send({ message: 'Error creating user' })
    })
  })
  .catch((err) => {
    console.log('Error in POST/auth/signup', err)
    res.status(503).send({ message: 'Something wrong, prob DB related.'})
  })
})

router.get('/current/user', (req,res) => {
  if (!req.user || !req.user._id) {
    return res.status(417).send({ message: 'Check configuration' })
  }
  res.send({ user: req.user })
})

module.exports = router;