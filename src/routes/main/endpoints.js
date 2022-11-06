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
  {
    method: "POST",
    path: "/teacher-login",
    handler: Handlers.teacherLogin,
    config: {
      auth: false,
    },
  },
];

module.exports = internals;
