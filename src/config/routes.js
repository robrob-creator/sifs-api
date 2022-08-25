"use strict";

var internals = {};

// Endpoints
let Student = require("../routes/user/endpoints");
let Main = require("../routes/main/endpoints");
let Subject = require("../routes/subject/endpoints");

internals.routes = [
  ...Student.endpoints,
  ...Main.endpoints,
  ...Subject.endpoints,
];

internals.init = function (server) {
  server.route(internals.routes);
};

module.exports = internals;
