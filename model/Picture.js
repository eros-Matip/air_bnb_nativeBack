const mongoose = require("mongoose");

const Picture = mongoose.model("Picture", {
  type: String,
  infos: Object,
});

module.exports = Picture;
