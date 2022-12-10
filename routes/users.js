const express = require("express");
// const bodyParser = require("body-parser");
const User = require("../models/users");
const usersRouter = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// usersRouter.use(bodyParser.json());

usersRouter
  .route("/signup")
  .get((req, res, next) => {
    console.log("ok");
  })
  .post((req, res, next) => {
    console.log("aaaa");
    console.log(req.body);
    try {
      console.log("heelo");
     
      User.register(
        {
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          class: req.body.class,
          username: req.body.email,
          email: req.body.email,
          phone: req.body.phone,
        },
        req.body.password,
        (err, user) => {
          if (!err) {
            //     passport.authenticate("local")(req, res, function () {
            //   // res.send("Successfully Registered User");
            // });
            const token = jwt.sign(
              {
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
                phone: user.phone,
                class: user.class,
              },
              process.env.SECRET
            );
            res.send({
              sucess: true,
              data: { message: "Successfully registered user" },
              user: token,
            });
          } else {
            console.log("rrororrr");
            res.send({ sucess: false, data: err });
          }
        }
      );
    } catch (error) {
      console.log("this is try error");
      console.log(err);
    }
  })
  .put((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  })
  .delete((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  });

usersRouter
  .route("/login")
  .get((req, res, next) => {
    res.statusCode = 403;
    res.end("Not Supported");
  })
  .post((req, res, next) => {
    const user = new User({
      username: req.body.email,
      password: req.body.password,
    });

    console.log(user);

    req.login(user, (err) => {
      if (err) {
        res.send({ success: false, data: err });
      } else {
        console.log("hellobvcbcv");
        try {
          passport.authenticate("local")(req, res, function () {
  
            res.send({ success: false, data: "token" });
          });
        } catch (error) {
          console.log(error);
        }
      
        // res.send({message:"success"});
      }
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

module.exports = usersRouter;
