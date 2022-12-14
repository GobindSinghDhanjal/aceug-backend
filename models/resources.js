const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resourcesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["video","lesson","quiz"],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  nextResource: {
    type: String,
    required: true,
  },
  nextModule: {
    type: String,
    required: true,
  },
});

const Resource = mongoose.model("Resource", resourcesSchema);

module.exports = Resource;
