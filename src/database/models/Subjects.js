const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var SubjectSchema = new Schema(
  {
    name: {
      //FILIPINO,ENGLISH, MATH
      type: String,
      require: true,
    },

    description: {
      type: String,
      required: false,
    },
    units: {
      type: Number,
      require: true,
    },
    updatorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Subjects = mongoose.model("Subject", SubjectSchema);
module.exports = Subjects;
