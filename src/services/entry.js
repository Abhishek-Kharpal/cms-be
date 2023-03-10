const db = require('../../database/models/index');
const HttpError = require('../utils/customError');

const getAllEntries = async () => {
  const entries = await db.entry.findAll();
  return entries;
};

const createEntry = async (collectionId, entryValues) => {
  const collection = await db.collection.findOne({
    where: { id: collectionId }
  });
  if(!collection) {
    throw new HttpError('400,Invalid collection id');
  }
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
    throw new HttpError('400,Invalid collection id');
  }
  const entry = await db.entry.findOne({
    where: { id }
  });
  if(!entry) {
    throw new HttpError(400,'Invalid entry id');
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

const addFieldToEntries = async (fieldId) => {
  const addedField = await db.field.findOne({
    where: { id: fieldId }
  });
  if(!addedField) {
    throw new HttpError(400,'Invalid field id');
  }
  const entries = await db.entry.findAll({
    where: { collectionId: addedField.collectionId }
  });
  await Promise.all(entries.map(async entry => {
    const entryValues = entry.entryValues;
    entryValues[addedField.name] = 'NONE';
    await updateEntry(entry.id, entry.collectionId, entryValues);
    return entry;
  }));
};

const updateFieldInEntries = async (fieldName, collectionId,id) => {
  const entries = await db.entry.findAll({
    where: { collectionId }
  });
  const oldField = await db.field.findOne({
    where: { id }
  });
  await Promise.all(entries.map(async entry => {
    const entryValues = entry.entryValues;
    entryValues[fieldName] = 'NONE';
    delete entryValues[oldField.name];
    await updateEntry(entry.id, entry.collectionId, entryValues);
    return entry;
  }));
};

const deleteFieldFromEntries = async (fieldId) => {
  const deletedField = await db.field.findOne({
    where: { id: fieldId }
  });
  if(!deletedField) {
    throw new HttpError(400,'Invalid field id');
  }
  const entries = await db.entry.findAll({
    where: { collectionId: deletedField.collectionId }
  });
  await Promise.all(entries.map(async entry => {
    const entryValues = entry.entryValues;
    delete entryValues[deletedField.name];
    await updateEntry(entry.id, entry.collectionId, entryValues);
    return entry;
  }));
};

module.exports = {
  getAllEntries,
  createEntry,
  updateEntry,
  deleteEntry,
  addFieldToEntries,
  updateFieldInEntries,
  deleteFieldFromEntries
};