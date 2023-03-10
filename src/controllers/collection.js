const collectionService = require('../services/collection');
const HttpError = require('../utils/customError');

const getAllCollections = async (req, res) => {
  try{
    const collections = await collectionService.getAllCollections();
    res.status(200).json(collections);
  }
  catch (err) {
    switch (err.constructor) {
    case HttpError:
      res.status(err.code).json({ error: err.message });
      break;
    default:
      res.status(500).json({ error: err.message });
    }
  }
};

const createCollection = async (req, res) => {
  try{
    const {name} = req.body;
    const collection = await collectionService.createCollection(name);
    res.status(201).json(collection);
  }
  catch (err) {
    switch (err.constructor) {
    case HttpError:
      res.status(err.code).json({ error: err.message });
      break;
    default:
      res.status(500).json({ error: err.message });
    }
  }
};

module.exports = {
  getAllCollections,
  createCollection
};