var express = require('express');
var router = express.Router();
var cors = require('cors');
const middleWare = require('../middleware/authanticate');
const userController = require('../controllers/user_controller');

/* GET users listing. */
router.get('/', middleWare.isAdmin, userController.find);

module.exports = router;