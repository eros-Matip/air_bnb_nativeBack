require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect("mongodb://localhost/air_bnb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const sign_up = require("./routes/Create");
const logIn = require("./routes/Login");
const updateProfile = require("./routes/UpdateProfile");
// const profilPicture = require("./routes/ProfilePicture");

app.use(sign_up);
app.use(logIn);
app.use(updateProfile);
// app.use(profilPicture);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Bad URL" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server started `);
});
