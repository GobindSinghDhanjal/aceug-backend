const ResouceBase = require("./resourcesBase"); // we have to make sure our Book schema is aware of the Base schema
const mongoose = require("mongoose");

const Lesson = ResouceBase.discriminator(
  "Lesson",
  new mongoose.Schema({
    material: { type: String, required: true },
    reading_time: { type: Number, required: true },
  })
);

module.exports = Lesson;
