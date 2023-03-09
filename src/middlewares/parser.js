const parser = (req, res, next) => {
  const id = req.params.id;
  try{
    req.params.id = parseInt(id);
  }
  catch(err){
    throw new Error('Invalid id');
  }
  next();
};

module.exports = parser;