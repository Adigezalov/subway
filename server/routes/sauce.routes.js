const express = require('express')
const passport = require('passport')
const upload = require('../middleware/upload')
const router = express.Router()
const controller = require('../controllers/sauce.controller')

router.get('/', passport.authenticate(`jwt`, {session: false}, null), controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}, null), controller.getById)
router.post('/', passport.authenticate('jwt', {session: false}, null), upload.single('image'), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}, null), upload.single('image'), controller.update)
router.delete('/:id', passport.authenticate('jwt', {session: false}, null), controller.delete)

module.exports = router
