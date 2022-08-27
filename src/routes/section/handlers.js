"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Config = require("../../config");
const Section = require("../../database/models/Section");
const ObjectId = require("mongoose").Types.ObjectId;
var internals = {};

internals.create_section = async (req, res) => {
  const updatorId = req.auth.credentials._id;
  var sectionData = new Section({
    ...req.payload,
    updatorId,
  });
  try {
    let result = await sectionData.save();
    return res.response(result).code(200);
  } catch (error) {
    console.log(error);
    return res.response(error).code(500);
  }
};
internals.getSection = async (req, h) => {
  let { pageSize, page, schoolYear, name } = req.query;
  let query = {};
  if (schoolYear) {
    query = { ...query, schoolYear: new RegExp(schoolYear, "i") };
  }
  if (name) {
    query = { ...query, name: new RegExp(name, "i") };
  }

  try {
    let list = await Section.find(query)
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
