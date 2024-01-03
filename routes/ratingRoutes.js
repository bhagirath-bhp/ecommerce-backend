const express = require('express')
const {addRating,removeRating} = require('../controllers/rating')
const {isLoggedIn} = require('../middleware/auth')

const router = express.Router()

router.post("/ratings/add",isLoggedIn,addRating)
router.delete("/ratings/delete",isLoggedIn,removeRating)

module.exports = router