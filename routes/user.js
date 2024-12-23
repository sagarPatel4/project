const express = require("express")
const { handleUserSignup, handleUserSignin } = require("../controllers/user")
const router = express.Router()

router.post('/signup', handleUserSignup)
router.post('/login', handleUserSignin)

module.exports = router