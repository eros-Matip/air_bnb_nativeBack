const express = require("express");
const formidable = require("express-formidable");

const app = express();
app.use(formidable());

const User = require("../model/User");

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

    if (req.fields.account.username) {
      user_to_update.account.username = req.fields.account.username;
    }
    console.log("5");

    if (req.fields.account.name) {
      user_to_update.account.name = req.fields.account.name;
    }
    console.log("6");

    if (req.fields.account.description) {
      user_to_update.account.description = req.fields.account.description;
    }

    await user_to_update.save();
    console.log("7");

    // const profile_picture_displayed = {};
    // profile_picture_displayed.id = user_to_update.profile_picture;
    // profile_picture_displayed.secure_url =
    //   user_to_update.profile_picture.infos.secure_url;

    res.status(200).json({
      message: "profile uploaded",
      email: user_to_update.email,
      username: user_to_update.account.username,
      name: user_to_update.account.name,
      description: user_to_update.account.description,

      //   picture: profile_picture_displayed,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
