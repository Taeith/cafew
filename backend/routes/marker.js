const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const markerCtrl = require('../controllers/marker');

router.post('/', auth, markerCtrl.create);
/*
router.get('/:id', auth, markerCtrl.getOneThing);
router.put('/:id', auth, markerCtrl.modifyThing);
router.delete('/:id', auth, markerCtrl.deleteThing);
*/
router.get('/', markerCtrl.getAll);

module.exports = router;