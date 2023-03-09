const db = require('../../database/models/index');

const getAllEntries = async () => {
  const entries = await db.entry.findAll();
  return entries;
};

const createEntry = async (collectionId, entryValues) => {
  const entry = await db.entry.create({
    collectionId,
    entryValues
  });
  return entry;
};

const updateEntry = async (id, collectionId, entryValues) => {
  const collection = await db.collection.findOne({
    where: { id: collectionId }
  });
  if(!collection) {
    throw new Error('Invalid collection id');
  }
  const entry = await db.entry.findOne({
    where: { id }
  });
  if(!entry) {
    throw new Error('Invalid entry id');
  }
  entry.collectionId = collectionId;
  entry.entryValues = entryValues;
  await entry.save();
  return entry;
};

const deleteEntry = async (id) => {
  await db.entry.destroy({
    where: { id }
  });
};

module.exports = {
  getAllEntries,
  createEntry,
  updateEntry,
  deleteEntry
};