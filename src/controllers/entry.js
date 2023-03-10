const entryService = require('../services/entry');
const HttpError = require('../utils/customError');
const getAllEntries = async (req, res) => {
  try {
    const entries = await entryService.getAllEntries();
    res.status(200).json(entries);
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

const createEntry = async (req, res) => {
  try {
    const { collectionId, entryValues } = req.body;
    const entry = await entryService.createEntry(collectionId, entryValues);
    res.status(201).json(entry);
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

const updateEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const { collectionId, entryValues } = req.body;
    const entry = await entryService.updateEntry(id, collectionId, entryValues);
    res.status(200).json(entry);
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

const deleteEntry = async (req, res) => {
  try {
    const { id } = req.params;
    await entryService.deleteEntry(id);
    res.status(204).json();
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
  getAllEntries,
  createEntry,
  updateEntry,
  deleteEntry
};