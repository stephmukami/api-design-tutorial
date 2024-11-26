//importing modules for session management and logging
require ("dotenv").config();
const express = require('express');
const createError = require("http-errors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const methodOverride = require("method-override");

const path = require('path')

const app = express();

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

//initializing db
const connectDB = require("./config/db");
const User = require("./models/User");
connectDB();

//initializing passport for auth
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

app.use(logger("dev"));

app.use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs');


//accessing modular routes
const userRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const signupRouter = require("./routes/signup");
const updateRouter = require("./routes/update");
const deleteRouter = require("./routes/delete");

app.get('/', (req, res) => {
  res.json({"msg": "welcome to idx api"});
});

app.use("/api/users",userRouter);
app.use("/api/login",loginRouter);
app.use("/api/signup",signupRouter);
app.use("/api/update",updateRouter);
app.use("/api/delete",deleteRouter);

//app.use() is more general and typically used for middleware or grouping routes, whereas app.get() is more specific to GET requests.

app.get("/logout",(req,res,next)=>{
  req.logout((err)=>{
    if (err){
      return next(err);
    }
    res.redirect("/");
  });
});


//session management config
app.use(session({secret: process.env.SECRET, resave: false, saveUninitialized: true})); // does not save a new session unless the session was modified but will save resulting data from the session
app.use(passport.initialize());
app.use(passport.session());

//error handling

//404 page
app.use(function(req,res,next){
  next(createError(404));
});

//other kinds of error
app.use(function(req,res,err,next){
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development"? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
})