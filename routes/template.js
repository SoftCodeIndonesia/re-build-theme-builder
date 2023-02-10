var express = require('express');
var templateController = require('../controllers/template_controller');
var templateComponentController = require('../controllers/template_component_controller');
const middleWare = require('../middleware/authanticate');
var router = express.Router();
router.post('/', middleWare.authenticate, templateController.create);
router.post('/build', middleWare.authenticate, templateController.build);
router.post('/download', middleWare.authenticate, templateController.downloadTemplate);
router.post('/component/', middleWare.authenticate, templateComponentController.create);
router.get('/', middleWare.authenticate, templateController.fetch);
router.get('/thumbnail/:id', templateController.thumbnail);
router.get('/component', middleWare.authenticate, templateComponentController.fetch);
router.get('/source/:id', templateController.readSource);
router.delete('/component/:template_id/:component_id', middleWare.authenticate, templateComponentController.delete);
router.delete('/:id', middleWare.authenticate, templateController.delete);

module.exports = router;
