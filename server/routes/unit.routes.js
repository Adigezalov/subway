const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const controller = require('../controllers/unit.controller')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}, null), controller.getAll)

router.get('/:id', passport.authenticate('jwt', {session: false}, null), controller.getById)

router.post(
	'/',
	passport.authenticate('jwt', {session: false}, null),
	upload.fields([
		{name: 'imageSixInch', maxCount: 1},
		{name: 'imageFootLong', maxCount: 1},
		{name: 'imageWrap', maxCount: 1},
		{name: 'imageSalad', maxCount: 1},
	]),
	controller.create
)

router.patch(
	'/:id',
	passport.authenticate('jwt', {session: false}, null),
	upload.fields([
		{name: 'imageSixInch', maxCount: 1},
		{name: 'imageFootLong', maxCount: 1},
		{name: 'imageWrap', maxCount: 1},
		{name: 'imageSalad', maxCount: 1},
	]),
	controller.update
)

router.delete('/:id', passport.authenticate('jwt', {session: false}, null), controller.delete)

module.exports = router
