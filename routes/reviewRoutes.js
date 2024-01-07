const express = require('express')
const {addRating,removeRating} = require('../controllers/reviews')
const {isLoggedIn} = require('../middleware/auth')

const router = express.Router()

router.route("/review").post(isLoggedIn,addRating).delete(isLoggedIn,removeRating)

module.exports = router