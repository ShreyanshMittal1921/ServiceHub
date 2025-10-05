const mongoose = require("mongoose");

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  service_type: { type: String, required: true }, // plumber, carpenter, etc.
  phone: String,
  rating: Number,
  location: String,
  experience: Number,
  availability: { type: Boolean, default: true }
});

module.exports = mongoose.model("Worker", workerSchema);

