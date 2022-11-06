const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var SubjectSchema = new Schema(
  {
    name: {
      //FILIPINO,ENGLISH, MATH
      type: String,
      require: true,
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    schedule: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
    units: {
      type: Number,
    },
    updatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Subjects = mongoose.model("Subjects", SubjectSchema);
module.exports = Subjects;
