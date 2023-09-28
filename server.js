const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/ConnectDB");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3500; //Port
connectDB();

app.use(express.urlencoded({ extended: false })); //recognize incoming req Object as string or arrays

app.use(express.json()); // recognize incoming req as a json Object
app.use("/register", require("./routes/register"));

app.use("/login", require("./routes/login"));
app.use("/forget", require("./routes/forget"));
app.use("/reset", require("./routes/reset"));
app.use("/todo", require("./routes/Todo"));

mongoose.connection.once("open", () => {
  console.log("connected to mango");

  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
}); //start Server
