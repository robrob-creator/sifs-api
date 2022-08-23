"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  {
    method: "POST",
    path: "/student",
    handler: Handlers.create_student,
    config: {
      auth: false,
    },
  },
];

module.exports = internals;
