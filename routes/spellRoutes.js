const express = require('express')
const {addSpell,getAllSpells} = require('../controllers/spells')
const { isLoggedIn, checkRole } = require('../middleware/auth')

const router = express.Router()

router.route("/spells").post(isLoggedIn,checkRole('admin'),addSpell)
router.get("/spells/:id", getAllSpells)

module.exports = router