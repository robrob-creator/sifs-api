"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  {
    method: "POST",
    path: "/login",
    handler: Handlers.login,
    config: {
      auth: false,
    },
  },
];

module.exports = internals;
