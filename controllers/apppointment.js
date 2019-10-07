let router = require('express').Router();
let db = require('../models')

// POST appointment
router.post('/create', (req,res) => {
  db.Appointment.findOne({
    goatId: req.body.goatId, 
    startDate: req.body.startDate,
    endDate: req.body.endDate
  })
  .then((appointment)=>{
    if (appointment){
      return res.status(409).send({
        message: 'Preexisting appointment, please select another date.'
      })
    }
    db.Appointment.create(req.body)
    .then((newAppointment) => {
      res.send({ 
        message: 'Appointment successfully created',
        appointmentId: newAppointment._id
      })
    })
    .catch((err) => {
      console.log('Error when creating new appointment', err)
      res.status(500).send({ message: 'Error creating appointment' })
    })
  })
  .catch((err) => {
    console.log('Error in POST/appointment/create', err)
    res.status(503).send({ message: 'Something went wrong.'})
  })
})

// GET all goat's appointments
router.get('/', (req,res) => {
  if (req.user.isGoat) {
    db.Appointment.find({
      goatId: req.user.id
    })
    .then((appointments)=>{
      res.send(appointments)
    })
    .catch((err) => {
      console.log('Error in GET/appointment/', err)
      res.status(503).send({ message: 'Something went wrong.' })
    })
  }
})

// GET one appointment
router.get('/:appointmentId' ,(req,res) => {
  db.Appointment.findOne({
    _id: req.params.appointmentId
  })
  .then((appointment)=>{
    if (!req.user.id === appointment.clientId || !req.user.id === appointment.goatId){
      return res.status(403).send({ message: 'You do not have permission for this action.' })
    }
    res.send({ appointment })
  })
  .catch((err) => {
    console.log(`Error in GET/appointment/${req.params.appointmentId}`, err)
    res.status(503).send({ message: 'Something went wrong.' })
  })
})

// DELETE appointment
router.delete('/:appointmentId', (req,res) => {
  db.Appointment.findOne({
    _id: req.params.appointmentId
  })
  .then((appointment)=>{
    if (!req.user.id === appointment.clientId || !req.user.id === appointment.goatId){
      return res.status(403).send({ message: 'You do not have permission for this action.' })    
    }
    db.Appointment.deleteOne({
      _id: req.params.appointmentId
    })
    .then(() => {
      res.send({ message: 'Deleted successfully' })
    })
    .catch((err) => {
      console.log('Error when deleting appointment', err)
      res.status(500).send({ message: 'Error deleting appointment' })
    })
  })
  .catch((err) => {
    console.log(`Error in DELETE/appointment/${req.params.appointmentId}`, err)
    res.status(503).send({ message: 'Something went wrong.' })
  })
})

// PUT appointment
router.put('/:appointmentId', (req, res) => {
  db.Appointment.findOne({
    _id: req.params.appointmentId
  })
  .then((appointment) => {
    if (!req.user.id === appointment.clientId || !req.user.id === appointment.goatId){
      return res.status(403).send({ message: 'You do not have permission for this action.' })      
    }
    if (req.body.startDate) {
      appointment.startDate = req.body.startDate
    }
    if (req.body.endDate) {
      appointment.endDate = req.body.endDate
    }
    if (req.body.location) {
      appointment.location = req.body.location
    }
    appointment.save()
    .then((appointment)=>{
      res.send({ 
        message: 'Updated apppointment successfully',
        appointment
      })
    })
  })
  .catch((err) => {
    console.log(`Error in PUT/appointment/${req.params.appointmentId}`, err)
    res.status(503).send({ message: 'Something went wrong.' })
  })
}) 

module.exports = router;