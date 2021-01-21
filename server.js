const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const orderRoute = require("./src/orderRoute");

const config = require("./src/DB");

const PORT = process.env.PORT || 8080;

mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

mongoose.connect(process.env.REACT_APP_MONGODB_URI).then(
  () => {
    console.log("Database is connected");
  },
  (err) => {
    console.log("Cannot connect to the database" + err);
  }
);

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use("/orders", orderRoute);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
