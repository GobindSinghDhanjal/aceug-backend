const express = require("express");
const router = express.Router();
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const multer  = require('multer');
const path = require("path");

const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");

const MAX_AGE = 1000 * 60 * 60 * 3;

const AdminJS = require("adminjs");
const AdminJSExpress = require("@adminjs/express");
const AdminJSMongoose = require("@adminjs/mongoose");

const Video = require("./models/videos");
const Lesson = require("./models/lessons");
const Quiz = require("./models/quiz");
const Question = require("./models/questions");
const Course = require("./models/courses");
const User = require("./models/users");
const Instructor = require("./models/instructor");
const Resource = require("./models/resources");
const Module = require("./models/modules");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const courseRouter = require("./routes/courseRouter");
const progressRouter = require("./routes/progressRouter");
const quizRouter = require("./routes/quiz");
const instructorRouter = require("./routes/instructor");
const resourceRouter = require("./routes/resources");
const moduleRouter = require("./routes/modules");

const Connect = require("connect-pg-simple");
const session = require("express-session");

const app = express();

app.use(cors());

app.use(
  session({
    secret: "The Secret",
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: MAX_AGE,
      sameSite: false,
    },
  })
);

// app.use(express.static('public')); 
app.use('/images', express.static('images'));

const DEFAULT_ADMIN = {
  email: process.env.DEFAULT_ADMIN_EMAIL,
  password: process.env.DEFAULT_ADMIN_PASSWORD,
};

const authenticate = async (email, password) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN);
  }
  return null;
};

const ConnectSession = Connect(session);
const sessionStore = new ConnectSession({
  conObject: {
    connectionString:
    process.env.POSTGRES_CONNECTION_STRING,
    ssl: process.env.NODE_ENV === "production",
  },
  tableName: "session",
  createTableIfMissing: true,
});

AdminJS.registerAdapter(AdminJSMongoose);

const pageResourceOptions = {
  properties: {
    material: {
      type: "richtext",
      custom: {
        modules: {
          toolbar: [
            ["bold", "italic"],
            ["link", "formula"],
          ],
        },
      },
    },
  },
};

const questionResourceOptions = {
  properties: {
    statement: {
      type: "richtext",
      custom: {
        modules: {
          toolbar: [
            ["bold", "italic"],
            ["link", "formula"],
          ],
        },
      },
    },
  },
};

const importExportFeature = require("@adminjs/import-export").default;

const adminOptions = {
  // We pass Category to `resources`
  resources: [
    {
      resource: Lesson,
      options: pageResourceOptions,
      features: [importExportFeature()],
    },
    { resource: Video },
    { resource: User },
    { resource: Course },
    {resource: Instructor},
    {resource: Resource},
    {resource: Module},
    { resource: Quiz, features: [importExportFeature()] },
    {
      resource: Question,
      options: questionResourceOptions,
      features: [importExportFeature()],
    },
  ],
};

const admin = new AdminJS(adminOptions);

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate,
    cookieName: "adminjs",
    cookiePassword: "sessionsecret",
  },
  null,
  {
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    secret: "sessionsecret",
    cookie: {
      httpOnly: process.env.NODE_ENV === "production",
      secure: process.env.NODE_ENV === "production",
    },
    name: "adminjs",
  }
);
app.use(admin.options.rootPath, adminRouter);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const url = process.env.MONGO_DB_URI;
const connect = mongoose.connect(url);

app.use(passport.initialize());

app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



connect.then(
  (db) => {
    console.log("Connected Successfully to the server");
  },
  (err) => console.log(err)
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/quiz",quizRouter);
app.use("/courses", courseRouter);
app.use("/progress", progressRouter);
app.use("/instructors", instructorRouter);
app.use("/resources", resourceRouter);
app.use("/modules",moduleRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
