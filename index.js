require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(formidable());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const sign_up = require("./routes/Create");
const logIn = require("./routes/Login");

app.use(sign_up);
app.use(logIn);

app.listen(process.env.PORT, () => {
  console.log(`Server started `);
});
