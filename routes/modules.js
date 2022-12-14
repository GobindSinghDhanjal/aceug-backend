const express = require("express");
const Module = require("../models/modules");
const moduleRouter = express.Router();

moduleRouter
  .route("/")
  .get((req, res, next) => {

    Module.find({},(err,result)=>{
        if(!err){
            res.send({success:true, data: result})
        }else{
            res.send({success:false, data: err})
        }
    })

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

module.exports = moduleRouter;
