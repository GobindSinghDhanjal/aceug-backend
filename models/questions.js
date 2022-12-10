const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const optionSchema = new Schema({
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

const questionSchema = new Schema(
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

var Question = mongoose.model("Question", questionSchema);

module.exports = Question;
