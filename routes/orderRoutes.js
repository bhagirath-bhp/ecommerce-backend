const express = require('express')
const {isLoggedIn, checkRole} = require('../middleware/auth')
const {addOrder,getAllOrdersForAUser,success,getOrderDetails,getAllOrdersForAdmin} = require('../controllers/order')

const router = express.Router()

router.post("/orders/add",isLoggedIn,addOrder)
router.get("/orders/:userId",isLoggedIn,getAllOrdersForAUser)
router.get("/admin/orders",isLoggedIn,getAllOrdersForAdmin)
router.get("/orders",isLoggedIn,success)
router.get("/order/:id",isLoggedIn,getOrderDetails)


module.exports = router