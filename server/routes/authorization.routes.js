const express = require('express')
const passport = require('passport')
const controller = require('../controllers/authorization.controller')

const router = express.Router()

router.post('/login', controller.login)
router.post('/signin', controller.signin)
// router.post('/register', passport.authenticate('jwt', {session: false}, null), controller.register)

module.exports = router
