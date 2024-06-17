const express = require('express')
const adminTransactionController = require('../controllers/adminTransaction.controller')

const router = express.Router()

router.get('/:id', adminTransactionController.getTransactionDetails)

module.exports = router
