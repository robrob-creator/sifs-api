"use strict";
var Handlers = require("./handlers"),
  internals = {};

internals.endpoints = [
  {
    method: "POST",
    path: "/user",
    handler: Handlers.create_user,
    config: { auth: "token" },
  },
  {
    method: "POST",
    path: "/teacher",
    handler: Handlers.create_teacher,
    config: { auth: "token" },
  },
  {
    method: "POST",
    path: "/user/{id}",
    handler: Handlers.edit_user,
    config: { auth: "token" },
  },
  {
    method: "POST",
    path: "/change-password/{id}",
    handler: Handlers.changePassword,
    config: { auth: "token" },
  },
  {
    method: "POST",
    path: "/admin-change-password/{id}",
    handler: Handlers.adminPasswordChange,
    config: { auth: "token" },
  },
  {
    method: "GET",
    path: "/users",
    handler: Handlers.get_user,
    config: { auth: "token" },
  },
  {
    method: ["GET"],
    path: "/profile",
    handler: Handlers.profile,
    config: { auth: "token" },
  },
  {
    method: "POST",
    path: "/update-role/{id}",
    handler: Handlers.updateRole,
    config: { auth: "token" },
  },
];

module.exports = internals;
