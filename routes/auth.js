var express = require('express');
var authController = require('../controllers/auth_controller');
const userValidator = require('../validator/user_validator');
var router = express.Router();



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource /auth routes');
});

router.post('/', userValidator.post, authController.register);
router.post('/login', userValidator.login, authController.login);
router.post('/social', userValidator.withSocial, authController.withSocial);

module.exports = router;
