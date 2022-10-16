"use strict";

module.exports = function (app) {
  var Trips = app.db.models.Trips;
  app.route("/trips").get(function (req, res) {
    Trips.findAll({}).then(function (data) {
      return res.json(data);
    })["catch"](function (error) {
      return res.status(422).json({
        msg: error.message
      });
    });
  }).post(function (req, res) {
    console.log(req.body);
  });
};