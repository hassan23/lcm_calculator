const mongoose = require("mongoose");
const LCMschema = new mongoose.Schema({
  time: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true
  },
  numbers: {
    type: Array,
    required: true
  },
  lcm: {
    type: Number,
    required: true
  },
  algo: {
    type: String,
    required: true
  },
  complexity: {
    type: String,
    require: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("lcm", LCMschema);
