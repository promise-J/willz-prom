const express = require('express')
const router = express.Router()
const userRouter = require('./users')
const utilRouter = require('./util')


router.use('/users', userRouter)
router.use('/utils', utilRouter)

module.exports = router