const router = require('express').Router();
const userCtrl = require('../controllers/user.controller')
router.post('/', userCtrl.createUser)
router.post('/check', userCtrl.createUnverifiedUser)
router.post('/verify', userCtrl.verifyUser)
router.post('/forgot', userCtrl.forgotPassword)
router.post('/login', userCtrl.login)
router.get('/', userCtrl.fetchUsersList)
router.get('/:id', userCtrl.fetchUserInfo)
router.put('/reset', userCtrl.updateUserCredentials)
router.put('/role/:id', userCtrl.updateUserRole)
router.delete('/:id', userCtrl.deleteUser)
module.exports = router;