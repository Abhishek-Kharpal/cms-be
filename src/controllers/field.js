const fieldService = require('../services/field');

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
    res.status(200).json(field);
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
};

const updateField = async (req, res) => {
  try{
    const {id} = req.params;
    const {name, type} = req.body;
    const field = await fieldService.updateField(id, name, type);
    res.status(200).json(field);
  }
  catch(err){
    res.status(500).json({ error: err.message });
  }
};

const deleteField = async (req, res) => {
  try{
    const {id} = req.params;
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