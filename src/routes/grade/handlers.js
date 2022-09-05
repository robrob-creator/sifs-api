"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Config = require("../../config");
const Grade = require("../../database/models/Grade");
const ObjectId = require("mongoose").Types.ObjectId;
var internals = {};

internals.create_grade = async (req, res) => {
  const gradedBy = req.auth.credentials._id;
  const { gradingPeriod, semester, schoolYear, section, student } = req.payload;
  var subjectData = new Grade({
    ...req.payload,
    gradedBy,
  });
  try {
    let grades = await Grade.find({
      $and: [
        { gradingPeriod },
        { semester },
        { schoolYear },
        { section },
        { student },
      ],
    });

    if (grades === []) {
      return res
        .response({ message: "Student Already graded for this Subject" })
        .code(422);
    } else {
      let result = await subjectData.save();
      return res.response(result).code(200);
    }
  } catch (error) {
    console.log(error);
    return res.response(error).code(500);
  }
  /*try {
   
  } catch (error) {
    console.log(error);
    return res.response(error).code(500);
  }*/
};
internals.getGrades = async (req, h) => {
  let { pageSize, page, section, semester, gradingPeriod, schoolYear } =
    req.query;
  let query = {};
  if (section) {
    query = { ...query, section };
  }
  if (semester) {
    query = { ...query, semester };
  }
  if (gradingPeriod) {
    query = { ...query, gradingPeriod };
  }
  if (schoolYear) {
    query = { ...query, schoolYear };
  }
  try {
    let list = await Grade.find(query)
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
