const express = require('express')
const controller = require('../controllers/order.controller')
const router = express.Router()
const upload = require('../middleware/upload')

router.post('/', upload.single('image'), controller.order)

module.exports = router
