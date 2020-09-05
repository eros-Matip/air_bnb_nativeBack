const express = require("express");
const fomridable = require("express-formidable");
const cloudinary = require("cloudinary").v2;

const app = express();
app.use(fomridable());

const User = require("../model/User");
const Picture = require("../model/Picture");

const router = express.Router();

router.post("/profile/picture", is_authenticated, async (req, res) => {
  try {
    const profile_picture = req.files.profile_picture.path;
    const profile_picture_upload_result = await cloudinary.uploader.upload(
      profile_picture
    );

    const picture_to_create = new Picture({
      type: "profile_picture",
      is_active: true,
      infos: profile_picture_upload_result,
    });

    const user_to_update = await User.findById(req.user._id);

    if (user_to_update.profile_picture) {
      const picture_to_delete = await Picture.findById(
        user_to_update.profile_picture
      );
      await cloudinary.uploader.destroy(picture_to_delete.infos.public_id);
      picture_to_delete.is_active = false;
      await picture_to_delete.save();
    }

    user_to_update.profile_picture = picture_to_create;

    await picture_to_create.save();
    await user_to_update.save();

    const profile_picture_displayed = {};
    profile_picture_displayed.id = picture_to_create._id;
    profile_picture_displayed.secure_url = picture_to_create.infos.secure_url;

    res.status(200).json({
      message: "profile picture uploaded",
      picture: profile_picture_displayed,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
