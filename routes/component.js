var express = require('express');
var componentController = require('../controllers/component_controller');
const middleWare = require('../middleware/authanticate');
var router = express.Router();
const uploadFile = require('../helper/upload');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource /component routes');
});

router.post('/', uploadFile.uploadFileComponent, middleWare.authenticate, componentController.create);
router.get('/:id', middleWare.authenticate, componentController.readContentComponent);
router.delete('/:id', middleWare.authenticate, componentController.delete);
module.exports = router;
