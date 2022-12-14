const express = require("express");
const Resource = require("../models/resources");
const resourceRouter = express.Router();

resourceRouter
  .route("/")
  .get((req, res, next) => {
    Resource.find({}, (err, result) => {
      if (!err) {
        res.send({ success: true, data: result });
      } else {
        res.send({ success: false, data: err });
      }
    });
  })
  .post((req, res, next) => {
    const name = req.body.name;

    // Quiz.create(req.body)
    //   .then(
    //     (quiz) => {
    //       res.send({
    //         success: true,
    //         data: { message: "Quiz Saved Successfully" },
    //       });
    //     },
    //     (err) => {
    //       res.send({
    //         success: false,
    //         data: err,
    //       });
    //     }
    //   )
    //   .catch((err) => {
    //     res.send({
    //       success: false,
    //       data: err,
    //     });
    //   });
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  });

module.exports = resourceRouter;
