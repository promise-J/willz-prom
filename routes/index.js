const express = require('express')
const router = express.Router()
const userRouter = require('./users')
const utilRouter = require('./util')
const paystackRouter = require('./paystack')


router.use('/users', userRouter)
router.use('/utils', utilRouter)
router.use('/paystack', paystackRouter)

module.exports = router