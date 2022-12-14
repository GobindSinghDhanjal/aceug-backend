const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resourcesSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  nextResource: { type: String, required: true },
  nextModule: { type: String, required: true },
});

const moduleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  //   resources: [resourcesSchema],
  resources: [
    {
      type: Schema.Types.ObjectId,
      ref: "Resource",
    },
  ],
});

const Module = mongoose.model("Module", moduleSchema);

module.exports = Module;
