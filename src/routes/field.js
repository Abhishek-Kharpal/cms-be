const express = require('express');
const fieldController = require('../controllers/field');
const parser = require('../middlewares/parser');
const validateToken = require('../middlewares/validateToken');

const router = express.Router();

router.route('/')
  .get(validateToken,fieldController.getAllFields)
  .post(validateToken,fieldController.createField);

router.route('/:id')
  .put(validateToken,parser,fieldController.updateField)
  .delete(validateToken,parser,fieldController.deleteField);

module.exports = router;