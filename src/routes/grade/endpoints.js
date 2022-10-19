"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  {
    method: "POST",
    path: "/grade",
    handler: Handlers.create_grade,
    config: { auth: "token" },
  },
  {
    method: "GET",
    path: "/grade",
    handler: Handlers.getGrades,
    config: { auth: "token" },
  },
  {
    method: "GET",
    path: "/grade/{id}",
    handler: Handlers.getGradesByStudent,
    config: { auth: "token" },
  },
  {
    method: "GET",
    path: "/sms",
    handler: Handlers.sendSMS,
    config: { auth: "token" },
  },
];

module.exports = internals;
