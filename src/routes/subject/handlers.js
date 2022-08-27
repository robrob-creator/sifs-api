"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Config = require("../../config");
const Subjects = require("../../database/models/Subjects");
const ObjectId = require("mongoose").Types.ObjectId;
var internals = {};

internals.create_subject = async (req, res) => {
  const updatorId = req.auth.credentials._id;
  var subjectData = new Subjects({
    ...req.payload,
    updatorId,
  });
  try {
    let result = await subjectData.save();
    return res.response(result).code(200);
  } catch (error) {
    console.log(error);
    return res.response(error).code(500);
  }
};
internals.getSubject = async (req, h) => {
  let { pageSize, page } = req.query;
  let query = {};

  try {
    let list = await Subjects.find()
      .limit(pageSize)
      .skip(page * pageSize);
    return h
      .response({
        errorCodes: [],
        data: {
          list,
        },
      })
      .code(200);
  } catch (err) {
    console.log(err);
    return h
      .response({
        errorCodes: [],
        message: "error",
      })
      .code(200);
  }
};
module.exports = internals;