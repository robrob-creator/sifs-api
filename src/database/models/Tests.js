const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TestSchema = new Schema(
  {
    line: {
      type: Number,
      required: true,
    },
    elements: [
      {
        start_timestamp: {
          type: Date,
          required: true,
        },
        line: {
          type: Number,
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        id: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          required: true,
        },
        keyword: {
          type: String,
          required: true,
        },
        steps: [
          {
            result: {
              status: {
                type: String,
                required: true,
              },
            },
            line: {
              type: Number,
              required: true,
            },
            name: {
              type: String,
              required: true,
            },
            match: {
              location: {
                type: String,
                required: true,
              },
            },
            keyword: {
              type: String,
              required: true,
            },
          },
        ],
        tags: [
          {
            name: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    keyword: {
      type: String,
      required: true,
    },
    uri: {
      type: String,
      required: true,
    },
    tags: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", TestSchema);
module.exports = Test;
