require("dotenv").config();
const express = require('express');
const createError = require("http-errors");
const path = require('path');
const logger = require("morgan");
const methodOverride = require("method-override");
const session = require("express-session");
const passport = require("passport");

const app = express();

const port = parseInt(process.env.PORT) || process.argv[3] || 8080;

// Database connection
const connectDB = require("./config/db");
connectDB();

// Middleware
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Session and passport
app.use(session({
  secret: process.env.SECRET, 
  resave: false, 
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', (req, res) => {
  res.json({"msg": "welcome to idx api"});
});

// Import and use routes
const userRouter = require("./routes/users");
// const loginRouter = require("./routes/login");
// const signupRouter = require("./routes/signup");
// const updateRouter = require("./routes/update");
// const deleteRouter = require("./routes/delete");

app.use("/api/users", userRouter);
// app.use("/api/login", loginRouter);
// app.use("/api/signup", signupRouter);
// app.use("/api/update", updateRouter);
// app.use("/api/delete", deleteRouter);

// Logout route
app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// 404 handler
app.use((req, res, next) => {
  next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// Start server
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});