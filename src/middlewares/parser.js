const HttpError = require('../utils/customError');

const parser = (req, res, next) => {
  const id = req.params.id;
  try{
    req.params.id = parseInt(id);
  }
  catch(err){
    throw new HttpError(400,'Invalid id');
  }
  next();
};

module.exports = parser;