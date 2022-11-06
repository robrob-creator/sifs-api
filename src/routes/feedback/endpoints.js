"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  {
    method: "POST",
    path: "/feedback",
    handler: Handlers.create_message,
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/get-feedback",
    handler: Handlers.getMessage,
    config: {
      auth: false,
    },
  },
];

module.exports = internals;
