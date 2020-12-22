const express = require('express')
const passport = require('passport')
const controller = require('../controllers/address.controller')
const router = express.Router()

router.post('/', passport.authenticate('jwt', {session: false}, null), controller.address)

module.exports = router
