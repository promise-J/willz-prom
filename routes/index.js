const express = require('express')
const router = express.Router()
const userRouter = require('./users')
const utilRouter = require('./util')
const paystackRouter = require('./paystack')
const vtuRouter = require('./vtu')
const transactionsRouter = require('./transactions')
const categoryRouter = require('./category')
const catalogRouter = require('./catalog')


router.use('/users', userRouter)
router.use('/utils', utilRouter)
router.use('/paystack', paystackRouter)
router.use('/vtu', vtuRouter)
router.use('/transactions', transactionsRouter)
router.use('/categories', categoryRouter)
router.use('/catalogs', catalogRouter)

module.exports = router