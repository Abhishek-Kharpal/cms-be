const express = require('express');
const entryController = require('../controllers/entry');
const parser = require('../middlewares/parser');

const router = express.Router();
const validateEntries = require('../middlewares/validateEntries');

router.route('/')
  .get(entryController.getAllEntries)
  .post(validateEntries,entryController.createEntry);

router.route('/:id')
  .put(parser,validateEntries,entryController.updateEntry)
  .delete(parser,entryController.deleteEntry);

module.exports = router;