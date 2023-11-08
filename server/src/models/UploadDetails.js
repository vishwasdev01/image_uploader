const mongoose = require("mongoose");

const uploadDetails = new mongoose.Schema({
  image: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
});

const UploadDetails = mongoose.model("uploadDetails", uploadDetails);

module.exports = UploadDetails;
