const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var TestSchema = new Schema(
  {
    line: {
      type: Number,
    },
    elements: [
      {
        start_timestamp: {
          type: Date,
        },
        line: {
          type: Number,
        },
        name: {
          type: String,
        },
        description: {
          type: String,
        },
        id: {
          type: String,
        },
        type: {
          type: String,
        },
        keyword: {
          type: String,
        },
        steps: [
          {
            result: {
              status: {
                type: String,
              },
            },
            line: {
              type: Number,
            },
            name: {
              type: String,
            },
            match: {
              location: {
                type: String,
              },
            },
            keyword: {
              type: String,
            },
          },
        ],
        tags: [],
      },
    ],
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    id: {
      type: String,
    },
    keyword: {
      type: String,
    },
    uri: {
      type: String,
    },
    tags: [],
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", TestSchema);
module.exports = Test;
