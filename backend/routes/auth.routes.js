const express = require('express')
const authController = require('../controllers/auth.controller')

const router = express.Router()


router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/get-detail', authController.getUserDetailByEmail)
router.put('/update', authController.updateProfile)
router.put('/update-password/:id', authController.updatePassword)
router.get('/user/:email', authController.getUserIdByEmail)

router.get('/admins', authController.getAllAdmins)
router.post('/admin/login', authController.loginAdmin)
router.post('/admin/register', authController.registerAdmin)
router.put('/admin/update/:id', authController.updateAdmin)

router.post('/manager/login', authController.loginManager)
router.post('/manager/register', authController.registerManager)
router.put('/manager/update/:id', authController.updateManager)

module.exports = router
