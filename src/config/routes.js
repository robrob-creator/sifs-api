"use strict";

var internals = {};

// Endpoints
let Student = require("../routes/user/endpoints");
let Main = require("../routes/main/endpoints");
let Subject = require("../routes/subject/endpoints");
let Section = require("../routes/section/endpoints");
let Grade = require("../routes/grade/endpoints");
let Feedback = require("../routes/feedback/endpoints");

internals.routes = [
  ...Student.endpoints,
  ...Main.endpoints,
  ...Subject.endpoints,
  ...Section.endpoints,
  ...Grade.endpoints,
  ...Feedback.endpoints,
];

internals.init = function (server) {
  server.route(internals.routes);
};

module.exports = internals;
