const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var Questionaire = new Schema({
  1: { type: String },
  2: { type: String },
  3: { type: String },
  4: { type: String },
  5: { type: String },
});

var FeedbackSchema = new Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    reciever: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    review: Object,
    subject: {
      type: String,
    },
    seen: {
      type: Boolean,
    },
    grade: {
      type: String,
    },
    resolved: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = Feedback;
