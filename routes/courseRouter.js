const express = require("express");
const Courses = require("../models/courses");
const courseRouter = express.Router();
const multer = require("multer");
const path = require("path");
const Instructor = require("../models/instructor");
const Module = require("../models/modules");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

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
  .post(
    imageUpload.fields([
      { name: "thumbnail", maxCount: 1 },
    ]),
    (req, res, next) => {
      // const thumbnail = JSON.parse(req.body.thumbnail);
      // console.log(thumbnail.data);

      // cloudinary.uploader.upload(
      //   thumbnail,
      //   { folder: "aceug" },
      //   (err, result) => {
      //     if (!err) {
      //       console.log(result);
      //       const thumbnail = result.secure_url;
      //     } else {
      //       console.log(err);
      //     }
      //   }
      // );

      const name = req.body.name;
      const thumbnail = req.files.thumbnail[0].path;
      const overview = {
        description: req.body.overviewDescription,
        iframe: req.body.iframe,
      };
      const modules = JSON.parse(req.body.modules);
      const instructors = JSON.parse(req.body.instructors);
      const price = Number(req.body.price);
      const duration = req.body.duration;
      const lectures = Number(req.body.lectures);
      const language = req.body.language;
      const enrolled = Number(req.body.enrolled);

      const data = {
        name,
        thumbnail,
        overview,
        modules,
        instructors,
        price,
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
    }
  )
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
          const instructorsIds = course.instructors;
          const moduleIds = course.modules;

          Instructor.find()
            .where("_id")
            .in(instructorsIds)
            .exec((err, instructors) => {
              if (!err) {
                course.instructors = instructors;

                Module.find()
                  .where("_id")
                  .in(moduleIds)
                  .populate("resources")
                  .exec((err, modules) => {
                    if (!err) {
                      course.modules = modules;

                      res.statusCode = 200;
                      res.setHeader("Content-Type", "application/json");
                      res.json(course);
                    } else {
                      console.log(err);
                    }
                  });
              } else {
                console.log(err);
              }
            });
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
