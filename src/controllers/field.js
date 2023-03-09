const fieldService = require('../services/field');
const entryService = require('../services/entry');
const getAllFields = async (req, res) => {
  try{
    const fields = await fieldService.getAllFields();
    res.status(200).json(fields);
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
};

const createField = async (req, res) => {
  try{
    const {name, type, collectionId} = req.body;
    const field = await fieldService.createField(name, type, collectionId);
    await entryService.addFieldToEntries(field.id);
    res.status(200).json(field);
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
};

const updateField = async (req, res) => {
  try{
    const {id} = req.params;
    const {name, type,collectionId} = req.body;
    await entryService.updateFieldInEntries(name, collectionId,id);
    const field = await fieldService.updateField(id, name,collectionId, type);
    res.status(200).json(field);
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
};

const deleteField = async (req, res) => {
  try{
    const {id} = req.params;
    await entryService.deleteFieldFromEntries(id);
    await fieldService.deleteField(id);
    res.status(204).json();
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllFields,
  createField,
  updateField,
  deleteField
};