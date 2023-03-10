const express = require('express');
const fieldController = require('../controllers/field');
const parser = require('../middlewares/parser');
const validateToken = require('../middlewares/validateToken');
const joiValidator = require('../middlewares/joiValidator');
const { createFieldSchema } = require('../utils/schema');

const router = express.Router();

router.route('/')
  .get(validateToken,fieldController.getAllFields)
  .post(validateToken, joiValidator(createFieldSchema) ,fieldController.createField);

router.route('/:id')
  .put(validateToken,parser,fieldController.updateField)
  .delete(validateToken,parser,fieldController.deleteField);

module.exports = router;