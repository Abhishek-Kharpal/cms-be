const db = require('../../database/models/index');
const HttpError = require('../utils/customError');
const getAllFields = async () => {
  const fields = await db.field.findAll();
  return fields;
};

const createField = async (name, type, collectionId) => {
  const collection = await db.collection.findOne({
    where: {
      id: collectionId
    }
  });
  if(!collection){
    throw new HttpError(400,'Invalid collection id');
  }
  const field = await db.field.create({
    name: name,
    type: type.toUpperCase(),
    collectionId: collection.id
  });
  return field;
};

const updateField = async (id, name, collectionId,type) => {
  const field = await db.field.findOne({
    where: {
      id: id
    }
  });
  if(!field){
    throw new HttpError(400,'Invalid field id');
  }
  const collection = await db.collection.findOne({
    where: {
      id: collectionId
    }
  });
  if(!collection){
    throw new HttpError(400,'Invalid collection id');
  }
  field.collectionId = collection.id;
  field.name = name;
  field.type = type.toUpperCase();
  await field.save();
  return field;
};

const deleteField = async (id) => {
  const field = await db.field.findOne({
    where: {
      id: id
    }
  });
  if(!field){
    throw new HttpError(400,'Invalid field id');
  }
  await field.destroy();
};

module.exports = {
  getAllFields,
  createField,
  updateField,
  deleteField
};