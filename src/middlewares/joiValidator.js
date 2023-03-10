const validateRequest = (schema) => {
  return (req, res, next) => {
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      res.status(400).json({ error: validationResult.error.message });
    }
    else{
      next();
    }
  };
};

module.exports = validateRequest;
