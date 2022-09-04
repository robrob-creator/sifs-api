const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var GradeSchema = new mongoose.Schema(
  {
    gradingPeriod: {
      type: String,
      require: true,
    },
    grade: {
      type: Number,
    },
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    gradedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { _id: false, timestamps: false }
);

var SectionSchema = new Schema(
  {
    name: {
      //FILIPINO,ENGLISH, MATH
      type: String,
      require: true,
    },
    sectionCode: {
      type: String,
      require: true,
    },
    schoolYear: {
      type: String,
      require: true,
    },
    semester: {
      type: String,
      require: true,
    },
    gradeLevel: {
      type: String,
      require: true,
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        grades: [GradeSchema],
      },
      { _id: false, timestamps: false },
    ],
    subjects: [
      {
        subject: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Subjects",
        },
        teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      },
      { _id: false, timestamps: false },
    ],
    updatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Sections = mongoose.model("Sections", SectionSchema);
module.exports = Sections;
