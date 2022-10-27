"use strict";

const { query } = require("@hapi/hapi/lib/validation");
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
  let { pageSize, page, deleted } = req.query;
  let query = {};
  if (deleted) {
    query = { ...query, deleted };
  }
  try {
    let list = await Subjects.find(query)
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
internals.delete_subjects = async (req, res) => {
  const updatorId = req.auth.credentials._id;
  const id = req.params.id;
  const filter = { _id: id };
  const payload = { deleted: true, updatorId };

  let r = await Subjects.findOneAndUpdate(filter, payload);
  console.log(r);
  return res.response({ message: "success" }).code(200);
};
internals.edit_subject = async (req, res) => {
  const updatorId = req.auth.credentials._id;
  const id = req.params.id;
  const filter = { _id: id };
  const payload = { ...req.payload, updatorId };

  let r = await Subjects.findOneAndUpdate(filter, payload);
  console.log(r);
  return res.response({ message: "success" }).code(200);
};
module.exports = internals;
