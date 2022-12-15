const express = require("express");
const Module = require("../models/modules");
const moduleRouter = express.Router();

moduleRouter
  .route("/")
  .get((req, res, next) => {
    Module.find({}, (err, result) => {
      if (!err) {
        res.send({ success: true, data: result });
      } else {
        res.send({ success: false, data: err });
      }
    });
  })
  .post((req, res, next) => {
    const name = req.body.name;

    res.statusCode = 403;
    res.end("Not Supported");

    // Instructor.create(req.body)
    //   .then(
    //     (instructor) => {
    //       res.send({
    //         success: true,
    //         data: {
    //           message: "Instructor Saved Successfully",
    //           instructor: instructor,
    //         },
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

moduleRouter
  .route("/new-module")
  .get((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  })
  .post((req, res, next) => {
    const name = req.body.name;
    const description = req.body.description;
    const resources = JSON.parse(req.body.resources);

    const data = {
      name,
      description,
      resources,
    };
    Module.create(data)
      .then(
        (module) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(module);
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

module.exports = moduleRouter;
