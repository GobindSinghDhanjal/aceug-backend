const express = require("express");
const Quiz = require("../models/quiz");
const quizRouter = express.Router();

quizRouter
  .route("/add-quiz")
  .get((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  })
  .post((req, res, next) => {
    // res.end("Hello");
    const name = req.body.name;
    const subject = req.body.subject;
    const time_limit = req.body.time;
    const minimum_grade = req.body.minimum_grade;
    const questions = req.body.questions;
    const tags = req.body.tags;

    console.log(name);
    console.log(subject);
    console.log(minimum_grade);
    console.log(questions);

    Quiz.create(req.body)
      .then(
        (quiz) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(quiz);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  });

  module.exports = quizRouter;