const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const router = express.Router()
const controller = require('../controllers/restaurant.controller')

router.get('/', passport.authenticate(`jwt`, {session: false}, null), controller.getAll)
router.get('/client', controller.getAllForClient)
router.get('/:id', passport.authenticate('jwt', {session: false}, null), controller.getById)
router.get('/client/:id', controller.getAllForClientById)
router.post('/', passport.authenticate('jwt', {session: false}, null), upload.single('image'), controller.create)
router.post(
	'/activate/:id',
	passport.authenticate('jwt', {session: false}, null),
	upload.single('image'),
	controller.activate
)
router.patch('/:id', passport.authenticate('jwt', {session: false}, null), upload.single('image'), controller.update)
router.delete('/:id', passport.authenticate('jwt', {session: false}, null), controller.delete)

module.exports = router
