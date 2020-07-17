const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({
  hotelName: {
    type: String,
    unique: true,
    required: true,
  },
  price: {
    type: String,
  },
  duration: {
    type: String,
  },
  validity: {
    type: String,
  },
  description: {
    type: String,
  },
});

const packageModel = mongoose.model("Package", packageSchema);

module.exports = packageModel;
