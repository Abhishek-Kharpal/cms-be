const db = require('../../database/models/index');

const validateEntries = async (req, res, next) => {
  const collection = await db.collection.findOne({
    where: { id: req.body.collectionId },
  });
  if(!collection) {
    throw new Error('Invalid collection id');
  }
  const fields = await db.field.findAll({
    where: { collectionId: req.body.collectionId },
  });
  const entryValues = req.body.entryValues;
  const entriesKeys = Object.keys(entryValues);
  const fieldNames = fields.map(field => field.name);
  if(entriesKeys.length !== fieldNames.length) {
    res.status(400).json({ message: 'Invalid number of fields' });
  }
  entriesKeys.forEach(key => {
    if(!fieldNames.includes(key)) {
      res.status(400).json({ message: 'Invalid field name' });
    }
  });
  next();
};

module.exports = validateEntries;