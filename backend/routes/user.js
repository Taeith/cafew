const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/user/:id', auth, userCtrl.update);
router.get('/user/:id', auth, userCtrl.get);

module.exports = router;