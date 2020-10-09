
const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const markerCtrl = require('../controllers/marker');

router.post('/', auth, markerCtrl.createThing);
router.get('/:id', auth, markerCtrl.getOneThing);
router.put('/:id', auth, markerCtrl.modifyThing);
router.delete('/:id', auth, markerCtrl.deleteThing);
router.get('/', auth, markerCtrl.getAllStuff);

module.exports = router;