const { Router} = require('express')
const router = Router()

const {postGuest, getGuests, putGuest, deleteGuest, getGuestById} = require('../controller/guest')

router.post('/guest', postGuest )
router.get('/guests', getGuests )
router.put('/guest/:id', putGuest )
router.delete('/guest/:id', deleteGuest )
router.get('/guest/:id', getGuestById )

module.exports = router