const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const security = require('../middleware/security');
const requestCtrl = require('../controllers/request');

router.post('/', auth, requestCtrl.add);
router.get('/:id', auth, requestCtrl.get);

module.exports = router;