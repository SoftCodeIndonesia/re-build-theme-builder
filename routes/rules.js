var express = require('express');
var router = express.Router();
const middleWare = require('../middleware/authanticate');
const rulesController = require('../controllers/rules_controller');
/* GET users listing. */
router.get('/', middleWare.isAdmin, rulesController.findAll);
router.get('/:id', middleWare.isAdmin, rulesController.findOne);
router.post('/', middleWare.isAdmin, rulesController.create);
router.delete('/:id', middleWare.isAdmin, rulesController.delete);
router.put('/:id', middleWare.isAdmin, rulesController.update);

module.exports = router;