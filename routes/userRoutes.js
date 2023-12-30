const express = require('express')
const {signup,login,addAddress,updateAddress,removeAddress} = require('../controllers/user')
const {isLoggedIn} = require('../middleware/auth')

const router = express.Router()

router.post("/signup",signup)
router.post("/login",login)
router.post("/address/add",isLoggedIn,addAddress)
router.put("/address/update",isLoggedIn,updateAddress)
router.delete("/address/remove",isLoggedIn,removeAddress)

module.exports = router