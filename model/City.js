const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({
  source: String,
  name: String,
  slug: { type: String, unique: true, required: true },
  loc: {
    type: [Number],
    index: "2d",
  },
  zoom: Number,
});

module.exports = mongoose.model("City", CitySchema, "cities");
