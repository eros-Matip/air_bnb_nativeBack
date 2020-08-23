const express = require("express");
const formidable = require("express-formidable");
const mongoose = require("mongoose");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const app = express();
app.use(formidable());
const router = express.Router();

const User = require("../model/User");

router.post("/sign_up", async (req, res) => {
  console.log("1");
  try {
    const alReadyExist = await User.findOne({ email: req.fields.email });
    console.log("2");
    if (alReadyExist) {
      console.log("3");

      return res.status(400).json({ message: `User Already exist` });
    }
    if (req.fields.username === "") {
      console.log("4");

      return res.status(401).json({ message: "username's field is missing" });
    }
    if (req.fields.email === "") {
      console.log("5");

      return res.status(401).json({ message: "email's field is missing" });
    }
    if (req.fields.name === "") {
      console.log("6");

      return res.status(401).json({ message: "name's field is missing" });
    }
    if (req.fields.description === "") {
      console.log("7");

      return res.status(401).json({ message: "description is missing" });
    }
    if (req.fields.password === "") {
      console.log("8");

      return res.status(401).json({ message: "password's field is missing" });
    }
    if (req.fields.password !== req.fields.passwordConfirm) {
      console.log("9");

      return res.status(401).json({ message: "your password is different" });
    } else {
      console.log("10");

      const password = req.fields.password;
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(16);

      const user = new User({
        email: req.fields.email,
        account: {
          username: req.fields.username,
          name: req.fields.name,
          description: req.fields.description,
        },
        salt: salt,
        hash: hash,
        token: token,
      });
      console.log("11");

      await user.save();
      console.log("12");

      return res.status(200).json({
        id: user.id,
        token: token,
        account: {
          username: req.fields.username,
          name: req.fields.name,
          description: req.fields.description,
        },
      });
    }
  } catch (error) {
    console.log("13");

    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
