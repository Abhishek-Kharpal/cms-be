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
  entriesKeys.forEach(key => {
    console.log(key, fieldNames);
    if(!fieldNames.includes(key)) {
      throw new Error('Invalid field name');
    }
  });
  next();
};

module.exports = validateEntries;