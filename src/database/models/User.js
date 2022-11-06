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
      ref: "Users",
    },
  },
  { _id: false, timestamps: true }
);

var SubjectGradeSchema = new mongoose.Schema(
  {
    name: {
      //FILIPINO,ENGLISH, MATH
      type: String,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
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
      ref: "Users",
    },
  },
  { _id: false, timestamps: true }
);

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    middleName: { type: String, required: true },
    suffix: { type: String },
    gradeLevel: { type: String },
    role: { type: Array },
    idNo: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String },
    userName: { type: String },
    strand_track: { type: String },
    subjects: {
      type: [SubjectGradeSchema],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", UserSchema);
