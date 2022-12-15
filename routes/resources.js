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
    const type = req.body.type;
    const duration = req.body.duration;
    const nextResource = req.body.nextResource;
    const nextModule = req.body.nextModule;
    const content = req.body.content;

    const data = { name, type, duration, nextResource, nextModule, content };

    Resource.create(data)
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
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  });

module.exports = resourceRouter;
