var express = require('express');
var sectionController = require('../controllers/section_controller');
const middleWare = require('../middleware/authanticate');
var router = express.Router();

router.post('/', middleWare.authenticate, sectionController.create);
router.get('/', middleWare.authenticate, sectionController.fetch);
router.delete('/:id', middleWare.authenticate, sectionController.delete);

module.exports = router;
