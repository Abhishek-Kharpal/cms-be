const express = require('express');
const collectionController = require('../controllers/collection');
const router = express.Router();

router.route('/')
  .get(collectionController.getAllCollections)
  .post(collectionController.createCollection);

module.exports = router;