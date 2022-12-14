const express = require("express");
const Courses = require("../models/courses");
const courseRouter = express.Router();
const multer = require("multer");
const path = require("path");

const imageStorage = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 1000000, // 1000000 Bytes = 1 MB
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|PNG|JPG)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a Image"));
    }
    cb(undefined, true);
  },
});

courseRouter
  .route("/")
  .get((req, res, next) => {
    Courses.find({})
      .then(
        (courses) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(courses);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post(imageUpload.fields([{ name: 'thumbnail', maxCount:1}, { name: 'iframe', maxCount:1}]), (req, res, next) => {


    console.log("this is body");
    console.log(req.body);
    console.log("this is file");
    console.log(req.files);
   
    const name = req.body.name;
    const thumbnail = req.files.thumbnail[0].path;
    const overview = {
      description: "abcd",
      iframe: req.files.iframe[0].path,
    };
    const modules = [];
    const instructors = [];
    const price = 10000;
    const reviews = [];
    const duration = 10;
    const lectures = 5;
    const language = "cscsdc";
    const enrolled = 2;

    const data = {
      name,
      thumbnail,
      overview,
      modules,
      instructors,
      price,
      reviews,
      duration,
      lectures,
      language,
      enrolled,
    };

    Courses.create(data)
      .then(
        (course) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(course);
        },
        (err) => next(err)
      )
      .catch((err) => next(err));

    // Courses.create(req.body)
    //   .then(
    //     (course) => {
    //       res.statusCode = 200;
    //       res.setHeader("Content-Type", "application/json");
    //       res.json(course);
    //     },
    //     (err) => next(err)
    //   )
    //   .catch((err) => next(err));
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  });

courseRouter
  .route("/:courseId")
  .get((req, res, next) => {
    Courses.findById(req.params.courseId)
      .then(
        (course) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(course);
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

courseRouter
  .route("/signature/course")
  .get((req, res, next) => {
    Courses.find({ signature: true })
      .then(
        (courses) => {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(courses);
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

module.exports = courseRouter;
