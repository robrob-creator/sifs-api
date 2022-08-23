"use strict";

const bcrypt = require("bcryptjs");
const User = require("../../database/models/User");

var internals = {};

internals.create_student = async (req, h) => {
  try {
    const hashedPassword = await bcrypt.hash(req.payload.password, 10);
    var payload = { ...req.payload, password: hashedPassword };
    var student = new User(payload);
    var result = await student.save();
    return h.response(result);
  } catch (error) {
    console.log(error);
    return h.response(error).code(500);
  }
};

module.exports = internals;
