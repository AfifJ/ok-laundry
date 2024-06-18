const express = require('express')
const adminTransactionController = require('../controllers/admin.transaction')

const router = express.Router()

router.get('/transaction/:id', adminTransactionController.getTransactionDetails)

module.exports = router
