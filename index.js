const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const productRoutes = require('./routes/productRoutes');

const app = express();

app.use(morgan("dev"))
app.use(express.json());
app.use(cors());

app.use('/api', productRoutes); // Use the company routes


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(8000, () => {
  console.log("conected to port 8000");
})