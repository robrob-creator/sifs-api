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
  {
    method: "GET",
    path: "/subject",
    handler: Handlers.getSubject,
    config: { auth: "token" },
  },
  {
    method: ["POST"],
    path: "/delete-subject/{id}",
    handler: Handlers.delete_subjects,
    config: { auth: "token" },
  },
];

module.exports = internals;
