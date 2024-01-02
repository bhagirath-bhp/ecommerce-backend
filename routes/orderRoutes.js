const express = require('express')
const {isLoggedIn} = require('../middleware/auth')
const {addOrder,getAllOrdersForAUser} = require('../controllers/order')

const router = express.Router()

router.post("/orders/add",isLoggedIn,addOrder)
router.get("/orders/:userId",isLoggedIn,getAllOrdersForAUser)


module.exports = router