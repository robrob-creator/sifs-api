"use strict";

var Mongoose = require("mongoose"),
  Config = require("../config");
var connection_string =
  "mongodb+srv://robert:cumarob27@cluster0.sq4pi0p.mongodb.net/?retryWrites=true&w=majority";

console.log("Config.mongodb", connection_string);
Mongoose.Promise = global.Promise;
Mongoose.connect(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log(`mongodb initialize success`))
  .catch((err) => console.log(err));
