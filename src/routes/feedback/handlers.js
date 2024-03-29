"use strict";

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Config = require("../../config");
const Feedback = require("../../database/models/Feedback");
const ObjectId = require("mongoose").Types.ObjectId;
var internals = {};

internals.create_message = async (req, res) => {
  const sender = req?.auth?.credentials?._id;
  var messageData = new Feedback({
    ...req.payload,
  });
  try {
    let result = await messageData.save();
    return res.response(sender).code(200);
  } catch (error) {
    console.log(error);
    return res.response(error).code(500);
  }
};

internals.getMessage = async (req, h) => {
  let { pageSize, page, reciever, sender, id } = req.query;
  let query = { deleted: { $ne: true } };
  if (reciever) {
    query = { ...query, reciever };
  }
  if (sender) {
    query = { ...query, sender };
  }
  if (id) {
    query = { ...query, _id: id };
  }
  try {
    let list = await Feedback.find(query)
      .populate("sender")
      .populate("reciever")
      .limit(pageSize)
      .skip(page * pageSize);
    return h
      .response({
        errorCodes: [],
        data: {
          list,
        },
      })
      .code(200);
  } catch (err) {
    console.log(err);
    return h
      .response({
        errorCodes: [],
        message: "error",
      })
      .code(200);
  }
};

internals.editFeedBack = async (req, res) => {
  const updatorId = req.auth.credentials._id;
  const id = req.params.id;
  const filter = { _id: id };
  const payload = { ...req.payload, updatorId };

  let r = await Feedback.findOneAndUpdate(filter, payload);
  console.log(r);
  return res.response({ message: "success" }).code(200);
};
/*
internals.delete_message = async (req, res) => {
  const updatorId = req.auth.credentials._id;
  const id = req.params.id;
  const filter = { _id: id };
  const payload = { deleted: true, updatorId };

  let r = await Feedback.findOneAndUpdate(filter, payload);
  console.log(r);
  return res.response({ message: "success" }).code(200);
};*/
module.exports = internals;
