const express = require("express");
const router = express.Router();

const Room = require("../models/Room.js");
const City = require("../models/City.js");

router.get("/home", function (req, res, next) {
  City.find()
    .exec()
    .then(function (cities) {
      Room.findRandom({}, {}, { limit: 3 }, function (err, rooms) {
        res.json({
          cities: cities || [],
          featured: rooms || [],
        });
      });
    })
    .catch(function (err) {
      res.status(400);
      return next(err.message);
    });
});

module.exports = router;
