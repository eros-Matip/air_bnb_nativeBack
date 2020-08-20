const express = require("express");
const router = express.Router();

const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const User = require("../model/User");

router.post("/logIn", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.fields.email });
    const logPassword = req.fields.password;

    if (req.fields.email === "") {
      return res.status(400).json({ message: "Email missing" });
    }
    if (req.fields.password === "") {
      return res.status(400).json({ message: "Password missing" });
    }
    if (user === null) {
      return res.status(400).json({ message: "User doesn't exists" });
    }
    const logHash = SHA256(logPassword + user.salt).toString(encBase64);

    if (user.hash === logHash) {
      return res.status(200).json({
        username: user.account.username,
        _id: user.id,
        token: user.token,
      });
    } else {
      return res.status(400).json({ message: "Invalid password " });
    }
  } catch (error) {
    console.error({ error: error.message });
  }
});
module.exports = router;
