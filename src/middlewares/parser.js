const parser = (req, res, next) => {
  const id = req.params.id;
  try{
    req.params.id = parseInt(id);
  }
  catch(err){
    res.status(400).json({ message: 'Invalid id' });
  }
  next();
};

module.exports = parser;