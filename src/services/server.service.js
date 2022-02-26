require('dotenv').config();
const port = process.env.PORT;
const express = require("express");
const cors = require("cors");
const apiRouter = require("../routes");

const app = express();

app.use(cors());

app.use(function (req, res, next) {
  if (req.originalUrl === "/api/v1/webhooks/stripe") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
app.use("/api/v1/", apiRouter);

exports.start = () => {
  app.listen(port, (err) => {
    if (err) {
      console.log(`Errors: ${err}`);
      process.exit(-1);
    }
    console.log(`app is runnning on port ${port}`);
  });
};
