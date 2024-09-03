const express = require('express');
const axios = require('axios');
require('dotenv').config();
const itemRoutes = require('./itemRoutes');
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.post('/validate', async (req, res) => {
  const { mobileNumber } = req.body;

  if (!mobileNumber) {
    return res.status(400).json({ error: 'Mobile number is required' });
  }

  try {
    const response = await axios.get(`https://api.numlookupapi.com/v1/validate/${mobileNumber}?apikey=${process.env.NUMLOOKUP_API_KEY}`);
    if (!response.data.valid) {
      return res.status(400).json({ error: 'Invalid mobile number' });
    }

    const { country_code, country_name, carrier } = response.data;
    res.json({
      countryCode: country_code,
      countryName: country_name,
      operatorName: carrier
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while validating the mobile number' });
  }
});

// Use the item routes
app.use('/api', itemRoutes);


async function startServer() {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useFindAndModify: false,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
  });

  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
}
startServer();
