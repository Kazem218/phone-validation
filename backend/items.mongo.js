const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  id: { type: String, unique: true, required: true }, // Custom id field
  name: { type: String, required: true },
  description: { type: String, required: true },
  mobileNumber: { type: String, unique: true, required: true }, // Ensure mobileNumber is unique
  countryCode: { type: String },
  countryName: { type: String },
  operatorName: { type: String }
});

// Ensure that id field is indexed for quick search
itemSchema.index({ id: 1 });

module.exports = mongoose.model('Item', itemSchema);
