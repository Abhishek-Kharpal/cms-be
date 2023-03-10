const express = require('express');
const entryController = require('../controllers/entry');
const validateToken = require('../middlewares/validateToken');
const parser = require('../middlewares/parser');

const router = express.Router();
const validateEntries = require('../middlewares/validateEntries');

router.route('/')
  .get(validateToken,entryController.getAllEntries)
  .post(validateToken,validateEntries,entryController.createEntry);

router.route('/:id')
  .put(validateToken,parser,validateEntries,entryController.updateEntry)
  .delete(validateToken,parser,entryController.deleteEntry);

module.exports = router;