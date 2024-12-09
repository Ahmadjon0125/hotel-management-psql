const { Router} = require('express')
const router = Router()

const {postRoom, getRooms, putRoom, deleteRoom, getRoomById} = require('../controller/room')

router.post('/room', postRoom )
router.get('/rooms', getRooms )
router.put('/room/:id', putRoom )
router.delete('/room/:id', deleteRoom )
router.get('/room/:id', getRoomById )

module.exports = router