"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  {
    method: "POST",
    path: "/user",
    handler: Handlers.create_user,
    config: {
      auth: "token",
    },
  },
];

module.exports = internals;
