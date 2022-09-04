const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var GradeSchema = new mongoose.Schema({
  gradingPeriod: {
    type: String,
    require: true,
  },
  semester: {
    type: String,
    require: true,
  },
  schoolYear: {
    type: String,
    require: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subjects",
  },
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sections",
  },
  grade: {
    type: Number,
  },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  gradedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Grades = mongoose.model("Grades", GradeSchema);
module.exports = Grades;
