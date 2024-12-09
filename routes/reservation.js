const { Router} = require('express')
const router = Router()

const {postReservation, getReservations, putReservation, deleteReservation , searchReservations} = require('../controller/reservation.js')

router.post('/reservation', postReservation )
router.get('/reservations', getReservations )
router.put('/reservation/:id', putReservation )
router.delete('/reservation/:id', deleteReservation )
router.get('/reservation/search', searchReservations )

module.exports = router