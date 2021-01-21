let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

let order = require("./Order");

router.route("/create").post((req, res, next) => {
  order.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

router.route("/").get((req, res, next) => {
  order.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
