const ResouceBase = require("./resourcesBase"); // we have to make sure our Book schema is aware of the Base schema
const mongoose = require("mongoose");

const Question = require("./questions");

const optionSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
  correct: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const questionSchema = new mongoose.Schema(
  {
    statement: {
      type: String,
      required: true,
    },
    options: [optionSchema],
    explanation: {
      type: String,
      required: true,
    },
    positive_marks: {
      type: Number,
      required: true,
    },
    negative_marks: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const quizSchema = new mongoose.Schema({
  name:{
    type:String,
    require:true
  },
  subject:{
    type:String,
    require:true
  },
  tags:{
    type:String,
    require:true
  },
  questions: [questionSchema],
  time_limit: {
    type: Number,
  },
  minimum_grade: {
    type: Number,
  },
});

// const Quiz = ResouceBase.discriminator("Quiz", quizSchema);
const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;
