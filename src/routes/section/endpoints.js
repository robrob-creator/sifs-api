"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  {
    method: "POST",
    path: "/section",
    handler: Handlers.create_section,
    config: { auth: "token" },
  },
  {
    method: "GET",
    path: "/section",
    handler: Handlers.getSection,
    config: { auth: "token" },
  },
  {
    method: ["POST"],
    path: "/section-add-subject/{id}",
    handler: Handlers.addSubject,
    config: { auth: "token" },
  },
];

module.exports = internals;
