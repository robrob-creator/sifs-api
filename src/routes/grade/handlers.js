"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Config = require("../../config");
const Grade = require("../../database/models/Grade");
const Section = require("../../database/models/Section");
const Subjects = require("../../database/models/Subjects");
const Semaphore = require("semaphore.co-sms");
const User = require("../../database/models/User");
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
      let target = await Section.find({ section });
      let targetCount = target[0]?.subjects.length;
      let user = await User.find({ student });
      let phoneNumber = user[0]?.phoneNumber;
      let grade = await Grade.find({
        section,
        student,
        gradingPeriod,
      }).populate("subject");

      if (targetCount === grade.length) {
        let SendSMS = async () => {
          let obj = {
            apikey: process.env.API_KEY,
            number: phoneNumber,
            message:
              "Your Grades have been uploaded, please visit the link provided to view your grades.", // or the sendername you applied for
          };
          let response = await Semaphore.send(obj);
          console.log(response);
        };
        let SendSMS2 = async () => {
          let obj = {
            apikey: process.env.API_KEY,
            number: phoneNumber,
            message:
              "https://main--nimble-valkyrie-c8d07b.netlify.app/student \nPlease use your LRN and password to access your account.", // or the sendername you applied for
          };
          let response = await Semaphore.send(obj);
          console.log(response);
        };
        SendSMS();
        SendSMS2();
        return res
          .response({
            message: "complete",
            target: target[0]?.subjects.length,
            gradeCount: grade.length,
            phoneNumber,
            result,
          })
          .code(200);
      }
      return res
        .response({
          message: "incomplete",
          target: target[0]?.subjects.length,
          gradeCount: grade.length,
          phoneNumber,
          result,
        })
        .code(200);
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
  if (subject) {
    query = { ...query, subject };
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
          Key: process.env.API_KEY,
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
    let targetCount = target[0]?.subjects.length;
    let gradeCount = await Grade.find({
      section,
      student,
      gradingPeriod,
    }).populate("subject");
    let sub = await Subjects.find({ subject });
    let gradeMsg = gradeCount
      .map((item, index) => `${item?.subject?.name}:${item.grade} \n`)
      .join(",");
    if (targetCount === gradeCount) {
      return {
        message: "complete",
        target: target[0]?.subjects.length,
        gradeCount: gradeCount.length,
        gradeMsg,
      };
    }
    return {
      message: "incomplete",
      target: target[0]?.subjects.length,
      gradeCount: gradeCount.length,
      cas: gradeCount[0]?.subject?.name,
      subject: sub,
      gradeMsg,
    };
  } catch (err) {
    console.log(err);
    return { message: err };
  }
};
module.exports = internals;
