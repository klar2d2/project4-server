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

router.get('/:userId', (req,res)=>{
    db.User.findById(req.params.userId)
    .then((user)=>{
        const recipients = user.chats.map( async (chat)=>{
            ids = chat.split('-')
            if (ids[0] === user._id) {
                return await db.User.findById(ids[1])
                .then((user) => {
                    return {
                        id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        chatId: chat
                    }
                })
            }
            else if (ids[1] === user._id){
                return await db.User.findById(ids[0])
                .then((user) => {
                    return {
                        id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        chatId: chat
                    }
                })
            }
            else{
                return
            }
        })
        res.send({recipients})

    })
})

module.exports = router;
