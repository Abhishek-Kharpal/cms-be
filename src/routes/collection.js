const express = require('express');
const collectionController = require('../controllers/collection');
const validateToken = require('../middlewares/validateToken');
const router = express.Router();

router.route('/')
  .get(validateToken,collectionController.getAllCollections)
  .post(validateToken,collectionController.createCollection);

module.exports = router;