"use strict";

const jwt = require("jsonwebtoken");
const Config = require("../../config");
const Test = require("../../database/models/Tests");
const ObjectId = require("mongoose").Types.ObjectId;
var internals = {};

internals.create_message = async (req, res) => {
  const sender = req?.auth?.credentials?._id;

  var payload = req.payload;
  if (typeof payload === "string") {
    try {
      payload = JSON.parse(payload);
    } catch (error) {
      console.log(error);
      return res.response(error).code(400);
    }
  }

  var messageData = new Test({
    line: payload.line,
    elements: payload.elements,
    name: payload.name,
    tags: payload.tags,
    description: payload.description,
    id: payload.id,
    keyword: payload.keyword,
    uri: payload.uri,
    tags: payload.tags,
  });

  try {
    await messageData.save();

    return res.response(sender).code(200);
  } catch (error) {
    console.log(error);
    return res.response(error).code(500);
  }
};

internals.getMessage = async (req, h) => {
  let { pageSize, page, reciever, sender, id, tags } = req.query;
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
  if (tags) {
    query = { ...query, tags: { $in: tags } };
  }
  try {
    let count = await Test.countDocuments(query);
    let totalPages = Math.ceil(count / pageSize);
    let skip = (totalPages - page - 1) * pageSize; // Calculate the skip value to start from the last page

    let list = await Test.find(query)
      .limit(pageSize)
      .skip(skip)
      .sort({ _id: -1 }); // Sort by _id in descending order to get the latest data first

    return h
      .response({
        count: count,
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

  let r = await Test.findOneAndUpdate(filter, payload);
  console.log(r);
  return res.response({ message: "success" }).code(200);
};

internals.downloadJson = async (req, res) => {
  try {
    const payload = req.payload;

    // Convert the payload to a JSON string
    const jsonString = JSON.stringify(payload, null, 2);

    // Set response headers for downloading a file

    // Send the JSON as the response
    return res
      .response(jsonString)
      .header("Content-Type", "application/json")
      .header("Content-Disposition", "attachment; filename=data.json");
  } catch (err) {
    console.error(err);

    // Handle the error and send an appropriate response
    return res
      .response({
        errorCodes: [],
        message: "Error occurred while processing the request",
      })
      .code(500);
  }
};

/*
internals.delete_message = async (req, res) => {
  const updatorId = req.auth.credentials._id;
  const id = req.params.id;
  const filter = { _id: id };
  const payload = { deleted: true, updatorId };

  let r = await Test.findOneAndUpdate(filter, payload);
  console.log(r);
  return res.response({ message: "success" }).code(200);
};*/
module.exports = internals;
