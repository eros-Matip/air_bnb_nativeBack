require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect("mongodb://localhost/air_bnb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sign_up = require("./routes/Create");
const logIn = require("./routes/Login");
// const room = require("./routes/room")
const updateProfile = require("./routes/UpdateProfile");

app.use(sign_up);
app.use(logIn);
// app.use(room);
app.use(updateProfile);

app.listen(process.env.PORT, () => {
  console.log(`Server started `);
});
