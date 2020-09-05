const express = require("express");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(formidable());

// Importation des Models
const User = require("../model/User");
const Picture = require("../model/Picture");
// const Picture = require("../model/Picture");

const router = express.Router();

router.post("/profile", async (req, res) => {
  try {
    console.log("1");
    console.log("req.fields._id->", req.fields._id);
    if (!req.fields._id) {
      return res.status(401).json({ message: "No id provided" });
    }
    console.log("2");

    const user_to_update = await User.findById(req.fields._id);
    console.log("user_to_update->", user_to_update);
    console.log("3");

    if (req.fields.email) {
      user_to_update.email = req.fields.email;
    }
    console.log("4");

    if (req.fields.username) {
      user_to_update.account.username = req.fields.username;
    }
    console.log("5");

    if (req.fields.name) {
      user_to_update.account.name = req.fields.name;
    }
    console.log("6");

    if (req.fields.description) {
      user_to_update.account.description = req.fields.description;
    }
    if (req.files.picture) {
    }
    // CLOUDINARY

    const profile_picture = req.files.picture;
    const result = await cloudinary.uploader.upload(profile_picture.path);

    const picture_to_create = new Picture({
      type: "profile_picture",
      infos: result,
    });
    console.log("7");
    await user_to_update.save();
    await picture_to_create.save();

    res.status(200).json({
      message: "profile uploaded",
      email: user_to_update.email,
      account: {
        username: user_to_update.account.username,
        name: user_to_update.account.name,
        description: user_to_update.account.description,
      },
      picture: result,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
