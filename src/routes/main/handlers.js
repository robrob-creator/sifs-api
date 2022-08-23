"use strict";

const bcrypt = require("bcryptjs");
const User = require("../../database/models/User");
const jwt = require("jsonwebtoken");
const Config = require("../../config");

var internals = {};

internals.login = async (req, h) => {
  const { idNo, password } = req.payload;
  try {
    let _profile = await User.findOne({ idNo });
    if (!_profile) {
      return h
        .response({
          message: "ID no. invalid.",
        })
        .code(404);
    }
    let validPass = await bcrypt.compare(password, _profile.password);
    if (!validPass) {
      return h
        .response({
          message: "Incorrect password.",
        })
        .code(405);
    }
    let profile = JSON.parse(JSON.stringify(_profile));
    delete profile.password;
    delete profile.__v;
    delete profile.createdAt;
    delete profile.updatedAt;
    return h
      .response({
        message: "Success",
        data: {
          accessToken: jwt.sign({ id: profile._id }, Config.crypto.privateKey),
          ...profile,
        },
      })
      .code(200);
  } catch (error) {
    console.log(error);
    return h.response(error).code(500);
  }
};
internals.landing = async (req, h) => {
  h.send("working");
};
module.exports = internals;
