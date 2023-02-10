var express = require('express');
var frameworkController = require('../controllers/style_framework_controller');
const middleWare = require('../middleware/authanticate');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource /auth routes');
});

router.post('/', middleWare.authenticate, frameworkController.create);

module.exports = router;
