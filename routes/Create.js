const express = require("express");
const formidable = require("express-formidable");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const uid2 = require("uid2");

const app = express();
app.use(formidable());
const router = express.Router();

const User = require("../model/User");

router.post("/sign_up", async (req, res) => {
  try {
    const alReadyExist = await User.findOne({ email: req.fields.email });

    if (alReadyExist) {
      return res.status(400).json({ message: `User Already exist` });
    }
    if (req.fields.username) {
      return res.status(401).json({ message: "username's field is missing" });
    }
    if (req.fields.email) {
      return res.status(401).json({ message: "email's field is missing" });
    }
    if (req.fields.name) {
      return res.status(401).json({ message: "name's field is missing" });
    }
    if (req.fields.description) {
      return res.status(401).json({ message: "description is missing" });
    }
    if (req.fields.password) {
      return res.status(401).json({ message: "password's field is missing" });
    } else {
      const password = req.fields.password;
      const salt = uid2(16);
      const hash = SHA256(password + salt).toString(encBase64);
      const token = uid2(16);

      const user = new User({
        email: req.fields.email,
        account: {
          username: req.fields.account.username,
          name: req.fields.account.name,
          description: req.fields.account.description,
        },
        picture: null,
        salt: salt,
        hash: hash,
        token: token,
      });

      await user.save();

      return res.status(200).json({
        id: user.id,
        token: token,
        email: user.email,
        account: {
          username: user.account.username,
          name: user.account.name,
          description: user.account.description,
        },
        picture: user.picture,
      });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
