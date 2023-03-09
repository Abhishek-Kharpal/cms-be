const express = require('express');
const fieldController = require('../controllers/field');
const parser = require('../middlewares/parser');
const router = express.Router();

router.route('/')
  .get(fieldController.getAllFields)
  .post(fieldController.createField);

router.route('/:id')
  .put(parser,fieldController.updateField)
  .delete(parser,fieldController.deleteField);

module.exports = router;