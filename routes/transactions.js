const TransactionController = require('../controllers/transactions.controller')
const auth = require('../middlewares/auth')
const { ROUTE_CREATE_TRANSACTION } = require('../util/page-route')

const router = require('express').Router()

router.post(ROUTE_CREATE_TRANSACTION, (req, res)=>{
    const transactionController = new TransactionController()
    return transactionController.createTransaction(req, res)
})

module.exports = router