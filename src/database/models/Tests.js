const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TestSchema = new Schema(
  {
    results: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", TestSchema);
module.exports = Test;
