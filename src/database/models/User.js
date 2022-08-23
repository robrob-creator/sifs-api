const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var GradeSchema = new mongoose.Schema(
  {
    name: {
      //1st, 2nd ,3rd or 4th grading
      type: String,
    },
    grade: {
      type: Number,
    },
    updatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { _id: false, timestamps: true }
);

var SubjectSchema = new mongoose.Schema(
  {
    name: {
      //FILIPINO,ENGLISH, MATH
      type: String,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    remarks: {
      type: String,
      required: false,
    },
    grades: {
      type: [GradeSchema],
    },
    updatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { _id: false, timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: true },
    suffix: String,
    gradeLevel: { type: String },
    role: { type: Array },
    idNo: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    strand_track: String,
    subjects: {
      type: [SubjectSchema],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
