const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    raview: {
      type: Object,
    },
    statues: {
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
