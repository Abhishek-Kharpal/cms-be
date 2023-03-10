const axios = require('axios');

const validateToken = async (req, res, next) => {
  try{
    const token = req.header('Authorization').split(' ')[1];
    const flag = await axios.get('http://localhost:8080/api/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .catch(() => {
        res.status(401).json({
          message: 'Unauthorized'
        });
      });
    if (flag.data.message === 'AUTHORIZED') {
      next();
    }
    else {
      res.status(401).json({
        message: 'Unauthorized'
      });
    }
  }
  catch(err){
    res.status(401).json({
      message: 'Please login'
    });
  }
};

module.exports = validateToken;