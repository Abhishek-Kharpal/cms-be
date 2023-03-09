const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});