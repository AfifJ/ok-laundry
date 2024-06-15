const express = require('express')
const transactionController = require('../controllers/transaction.controller')

const router = express.Router()

router.get('/', transactionController.getAllTransactions)

router.get('/:userid', transactionController.getTransactionsByUserId)
router.get('/:userid/:id', transactionController.getTransactionDetails)
router.post('/:userid/:id/report', transactionController.createReport)

router.put('/:userid/:id/status', transactionController.updateTransactionStatus)

module.exports = router
