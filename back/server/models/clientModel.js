const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  staff: {
    type: Boolean,
    required: false,
  },
  forename: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
});

const Client = mongoose.model("client", clientSchema);

module.exports = Client;
