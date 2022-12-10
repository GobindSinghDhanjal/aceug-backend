const express = require("express");
// const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ResouceBase = require("../models/resourcesBase");
const progressRouter = express.Router();

// progressRouter.use(bodyParser.json());

progressRouter
  .route("/:userId/courses/:courseId/resources/:resourceId")
  .get((req, res, next) => {
    console.log(
      "user " +
        req.params.userId +
        " is enrolled in Course - " +
        req.params.courseId
    );
    ResouceBase.findById(req.params.resourceId)
      .then(
        (resource) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(resource);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  });

module.exports = progressRouter;
