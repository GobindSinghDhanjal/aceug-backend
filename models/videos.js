const ResouceBase = require("./resourcesBase"); // we have to make sure our Book schema is aware of the Base schema
const mongoose = require("mongoose");

const Video = ResouceBase.discriminator(
  "Video",
  new mongoose.Schema({
    url: { type: String, required: true },
    duration: { type: Number },
  })
);

module.exports = Video;
