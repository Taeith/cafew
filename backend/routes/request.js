const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const security = require('../middleware/security');
const requestCtrl = require('../controllers/request');

// TO DO SECURITY

router.post('/', auth, requestCtrl.add);
router.get('/:type/:id/:state', requestCtrl.get);
router.put('/:id', requestCtrl.update);

module.exports = router;