const express = require('express')
const {isLoggedIn} = require('../middleware/auth')
const {addOrder} = require('../controllers/order')

const router = express.Router()

router.post("/order/add",isLoggedIn,addOrder)

module.exports = router