const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.port;
const cors = require("cors");
const bodyParser = require("body-parser");
const userRouter = require("./routes/userRouter");

app.use(express.json());
// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*", // Allow requests from all origins
    credentials: true, // Allow sending cookies
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// CORS middleware to apply headers with conditional origin
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://calculator-with-mongodb-node-express.vercel.app",
  ];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(userRouter);

app.listen(port, (req, res) => {
  console.log(`server is connected localhost:http://127.0.0.1:${port}`);
});
