var express = require('express');
var metaController = require('../controllers/meta_data_controller');
const middleWare = require('../middleware/authanticate');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource /auth routes');
});

router.post('/', middleWare.authenticate, metaController.create);
router.delete('/:id', middleWare.authenticate, metaController.delete);

module.exports = router;
