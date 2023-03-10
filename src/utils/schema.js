const joi = require('joi');

const createCollectionSchema = joi.object({
  name: joi.string().min(1).required(),
});

const createEntrySchema = joi.object({
  collectionId: joi.number().integer().min(0).required(),
  entryValues: joi.object().required()
});

const createFieldSchema = joi.object({
  collectionId: joi.number().integer().min(0).required(),
  name: joi.string().min(1).required(),
  type: joi.string().min(1).required(),
});

module.exports = {
  createCollectionSchema,
  createEntrySchema,
  createFieldSchema
};