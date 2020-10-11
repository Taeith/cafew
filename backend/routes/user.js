const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const security = require('../middleware/security');
const userCtrl = require('../controllers/user');

router.put('/:id', auth, security, userCtrl.update);
router.get('/:id', auth, security, userCtrl.get);

module.exports = router;