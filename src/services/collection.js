const db = require('../../database/models/index');

const getAllCollections = async () => {
  const collections = await db.collection.findAll();
  return collections;
};

const createCollection = async (name) => {
  const collection = await db.collection.create({
    name: name
  });
  return collection;
};

module.exports = {
  getAllCollections,
  createCollection
};