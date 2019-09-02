const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const mongoose = require("mongoose");
const config = require("./config/index");

mongoose.connect("mongodb://localhost/mydb", { useNewUrlParser: true });

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());

// User Routes
const userRoute = require("./routes/user/auth/userAuth");
app.use("/user", userRoute);

// Admin Routes
const adminAuthRoutes = require("./routes/admin/auth/adminAuth");
app.use("/admin", adminAuthRoutes);

// Admin Actions
// Admin Routes
const adminActionsRoutes = require("./routes/admin/actions/adminAction");
app.use("/action", adminActionsRoutes);

app.listen(config["port"], () => {
  console.log(`Server listening on port: ${config["port"]}`);
});
