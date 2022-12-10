const mongoose = require("mongoose");

const baseOptions = {
  discriminatorKey: "type", // our discriminator key, could be anything
  collection: "resources", // the name of our collection
  timestamps: true,
};

const resourceBaseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    completion_value: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  baseOptions
);

// Our Base schema: these properties will be shared with our "real" schemas
const ResouceBase = mongoose.model("ResouceBase", resourceBaseSchema);

module.exports = ResouceBase;
