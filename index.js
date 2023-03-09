const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const collectionRoutes = require('./src/routes/collection');
const fieldRoutes = require('./src/routes/field');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/api/collections', collectionRoutes);
app.use('/api/fields', fieldRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});