const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    student: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

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
  resources: [resourcesSchema],
});

const instructorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  social_links: [
    {
      platform: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  courses: {
    type: Array,
    required: true,
  },
});

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    overview: {
      description: {
        type: String,
        required: true,
      },
      iframe:{
        type: String,
        required: true,
      }
    },
    modules: [moduleSchema],
    instructors: [instructorSchema],
    price: {
      type: Number,
      required: true,
    },
    reviews: [reviewSchema],
    duration: {
      type: Number,
      required: true,
    },
    lectures: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    enrolled: {
      type: Number,
      required: true,
    },
    signature:{
      type:Boolean,
      required: true,
      default: false
    }
  },
  {
    timestamps: true,
  }
);

var Course = mongoose.model("Course", courseSchema);

module.exports = Course;
