"use strict";

var internals = {};

// Endpoints

let Test = require("../routes/Test/endpoints");

internals.routes = [...Test.endpoints];

internals.init = function (server) {
  server.route(internals.routes);
};

module.exports = internals;
