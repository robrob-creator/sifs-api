"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  {
    method: "POST",
    path: "/subject",
    handler: Handlers.create_subject,
    config: { auth: "token" },
  },
];

module.exports = internals;
