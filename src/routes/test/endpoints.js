"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  {
    method: "POST",
    path: "/test",
    handler: Handlers.create_message,
    config: {
      auth: false,
    },
  },
  {
    method: "GET",
    path: "/get-test",
    handler: Handlers.getMessage,
    config: {
      auth: false,
    },
  },
  {
    method: ["POST"],
    path: "/edit-test/{id}",
    handler: Handlers.editFeedBack,
    config: { auth: "token" },
  },
];

module.exports = internals;
