const express = require("express");
const helmet = require("helmet");
const compresion = require("compression");
const morgan = require("morgan");
// Routers
const { usersRouter } = require("./routes/users.routes");
const { postsRouter } = require("./routes/posts.routes");
const { commentsRouter } = require("./routes/comments.routes");

// Controllers
const { globalErrorHandler } = require("./controllers/error.controller");

// Init our Express app
const app = express();

// Enable Express app to receive JSON data
app.use(express.json());

// Heroku : Add Security
app.use(helmet());

//  Heroku :  Comapresion
app.use(compresion());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
else if (process.env.NODE_ENV === "production") app.use(morgan("combined"));

//  Heroku :  morgan
app.use(morgan("dev"));

// Define endpoints
// /posts
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postsRouter); // next(error)
app.use("/api/v1/comments", commentsRouter);

// Global error handler
app.use(globalErrorHandler);

// Catch non-existing endpoints
app.all("*", (req, res) => {
    res.status(404).json({
        status: "error",
        message: `${req.method} ${req.url} does not exists in our server`,
    });
});

module.exports = { app };
