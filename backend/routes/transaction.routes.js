const express = require('express')
const transactionController = require('../controllers/transaction.controller')

const router = express.Router()

router.get('/', transactionController.getAllTransactions)

router.put('/status/:id', transactionController.updateTransactionStatus)
router.get('/report', transactionController.getAllReports)
router.put('/report/:id/status', transactionController.updateReportStatus)
router.get('/report/:id', transactionController.getCustomerReportDetails)
router.post('/create', transactionController.createTransaction)

router.get('/:userid', transactionController.getTransactionsByUserId)
router.get('/:userid/:id', transactionController.getTransactionDetails)
router.post('/:userid/:id/report', transactionController.createReport)

// router.put('/:userid/:id/status', transactionController.updateTransactionStatus)

module.exports = router
