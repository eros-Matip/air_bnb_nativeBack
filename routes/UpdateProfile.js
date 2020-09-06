const express = require("express");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(formidable());

const User = require("../model/User");

const router = express.Router();

router.put("/profile", async (req, res) => {
  try {
    if (!req.fields._id) {
      return res.status(401).json({ message: "No id provided" });
    }
    const user_to_update = await User.findById(req.fields._id);
    if (req.fields.email) {
      user_to_update.email = req.fields.email;
    }
    if (req.fields.username) {
      user_to_update.account.username = req.fields.username;
    }
    if (req.fields.name) {
      user_to_update.account.name = req.fields.name;
    }
    if (req.fields.description) {
      user_to_update.account.description = req.fields.description;
    }
    // CLOUDINARY
    if (req.files.picture) {
      const profile_picture = req.files.picture;
      const result = await cloudinary.uploader.upload(profile_picture.path);
      user_to_update.picture = result;
    }
    await user_to_update.save();

    res.status(200).json({
      message: "profile uploaded",
      email: user_to_update.email,
      account: {
        username: user_to_update.account.username,
        name: user_to_update.account.name,
        description: user_to_update.account.description,
      },
      picture: user_to_update.picture.secure_url,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
