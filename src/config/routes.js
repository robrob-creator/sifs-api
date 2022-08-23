"use strict";

var internals = {};

// Endpoints
let Student = require("../routes/user/endpoints");
let Main = require("../routes/main/endpoints");

internals.routes = [...Student.endpoints, ...Main.endpoints];

internals.init = function (server) {
  server.route(internals.routes);
};

module.exports = internals;
