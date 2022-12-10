const ResouceBase = require("./resourcesBase"); // we have to make sure our Book schema is aware of the Base schema
const mongoose = require("mongoose");

const Question = require("./questions");

const quizSchema = new mongoose.Schema({
  questions: [
    {
      type: mongoose.ObjectId,
      ref: Question,
    },
  ],
  time_limit: {
    type: Number,
  },
  minimum_grade: {
    type: Number,
  },
});

const Quiz = ResouceBase.discriminator("Quiz", quizSchema);

module.exports = Quiz;
