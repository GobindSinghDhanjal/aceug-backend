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
    const name = req.body.name;
    const subject = req.body.subject;
    const time_limit = req.body.time;
    const minimum_grade = req.body.minimum_grade;
    const questions = req.body.questions;
    const tags = req.body.tags;

    Quiz.create(req.body)
      .then(
        (quiz) => {
          // res.statusCode = 200;
          // res.setHeader("Content-Type", "application/json");
          // res.json(quiz);
          res.send({
            success: true,
            data: { message: "Quiz Saved Successfully" },
          });
        },
        (err) => {
          res.send({
            success: false,
            data: err,
          });
        }
      )
      .catch((err) => {
        res.send({
          success: false,
          data: err,
        });
      });
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