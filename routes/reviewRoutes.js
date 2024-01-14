const express = require('express')
const {addRating,removeRating,getRatingsForAProduct} = require('../controllers/reviews')
const {isLoggedIn} = require('../middleware/auth')

const router = express.Router()

router.route("/review").post(isLoggedIn,addRating).delete(isLoggedIn,removeRating)

router.get("/review/:productId",isLoggedIn,getRatingsForAProduct)

module.exports = router