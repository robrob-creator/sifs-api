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
    path: "/section-add-student/{id}",
    handler: Handlers.addStudent,
    config: { auth: "token" },
  },
  {
    method: ["POST"],
    path: "/section-add-subject/{id}",
    handler: Handlers.addSubject,
    config: { auth: "token" },
  },
  {
    method: ["POST"],
    path: "/edit-section/{id}",
    handler: Handlers.edit_section,
    config: { auth: "token" },
  },
  {
    method: ["POST"],
    path: "/delete-section/{id}",
    handler: Handlers.delete_section,
    config: { auth: "token" },
  },
  {
    method: ["POST"],
    path: "/one-subject/{id}",
    handler: Handlers.addOneSubject,
    config: { auth: "token" },
  },
];

module.exports = internals;
