const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const router = express.Router()
const controller = require('../controllers/menu.controller')

router.get('/:id', passport.authenticate('jwt', {session: false}, null), controller.getByRestaurant)
router.get('/client/:id', controller.getByRestaurantForClient)
router.post('/', passport.authenticate('jwt', {session: false}, null), upload.single('image'), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}, null), upload.single('image'), controller.update)

module.exports = router
