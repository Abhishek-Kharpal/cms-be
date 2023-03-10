const express = require('express');
const collectionController = require('../controllers/collection');
const validateToken = require('../middlewares/validateToken');
const joiValidator = require('../middlewares/joiValidator');
const { createCollectionSchema } = require('../utils/schema');
const router = express.Router();

router.route('/')
  .get(validateToken, collectionController.getAllCollections)
  .post(validateToken, joiValidator(createCollectionSchema), collectionController.createCollection);

module.exports = router;