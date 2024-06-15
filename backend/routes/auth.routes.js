const express = require('express')
const authController = require('../controllers/auth.controller')

const router = express.Router()


router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/get-detail', authController.getUserDetailByEmail)
router.put('/update', authController.updateProfile)
router.put('/update-password/:id', authController.updatePassword)

router.post('/admin/login', authController.loginAdmin)
router.post('/admin/register', authController.registerAdmin)

module.exports = router
