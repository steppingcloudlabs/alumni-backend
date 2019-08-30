const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const config=require('./config/index');

mongoose.connect("mongodb://localhost/mydb", { useNewUrlParser: true });

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

//Routes
const userRoute = require("./routes/user/user.auth");
app.use("/api/v1/user", userRoute);

const adminRoute = require("./routes/admin/admin.auth");
app.use("/api/v1/admin", adminRoute);


app.listen(config["port"], () => {
  console.log(`Server listening on port: ${config["port"]}`);
});