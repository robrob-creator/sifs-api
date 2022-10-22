"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Config = require("../../config");
const Grade = require("../../database/models/Grade");
const Section = require("../../database/models/Section");
const ObjectId = require("mongoose").Types.ObjectId;
var internals = {};

internals.create_grade = async (req, res) => {
  const gradedBy = req.auth.credentials._id;
  const { gradingPeriod, semester, schoolYear, section, student, subject } =
    req.payload;

  var gradeData = new Grade({
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
        { subject },
      ],
    });

    if (grades == [] || grades == null || grades == "") {
      let result = await gradeData.save();
      console.log(true);
      return res.response(result).code(200);
    } else {
      console.log(false);
      return res
        .response({ message: "Student Already graded for this Subject" })
        .code(422);
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
  let {
    pageSize,
    page,
    section,
    semester,
    gradingPeriod,
    schoolYear,
    subject,
    student,
  } = req.query;
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
  if (student) {
    query = { ...query, student };
  }
  try {
    let list = await Grade.find(query)
      .populate("subject")
      .populate("student")
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
internals.getGradesByStudent = async (req, h) => {
  const id = req.params.id;
  let {
    pageSize,
    page,
    section,
    semester,
    gradingPeriod,
    schoolYear,
    student,
  } = req.query;
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
  if (student) {
    query = { ...query, student };
  }
  if (id) {
    query = { ...query, student: id };
  }
  try {
    let list = await Grade.find(query)
      .populate("subject")
      .populate("student")
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

internals.sendSMS = async (req, res) => {
  const { gradingPeriod, semester, schoolYear, section, student, subject } =
    req.payload;

  try {
    let target = await Section.find({ section });
    let gradeCount = await Grade.count({ section, student, gradingPeriod });
    console.log("lenght", target[0]?.subjects.length);
    return {
      target: target[0]?.subjects.length,
      gradeCount,
    };
  } catch (err) {
    console.log(err);
    return { message: err };
  }
};
module.exports = internals;
