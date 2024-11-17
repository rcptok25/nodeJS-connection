const express = require("express");
const router = express.Router();
const ToDo = require("../db/models/to_do_table");
const Response = require("../lib/Response");
const CustomError = require("../lib/Error");
const Enum = require("../config/Enum");
const logger = require("../lib/logger/LoggerClass");

router.get("/", async (req, res) => {
  try {
    let toDoList = await ToDo.find();
    res.json(Response.successResponse(toDoList, undefined));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.post("/", async (req, res) => {
  let body = req.body;
  try {
    if (!body.name)
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "Validation Error!",
        "Name is required"
      );

    let toDo = new ToDo({
      name: body.name,
      description: body.description,
      status: body.status,
      date: body.date,
    });

    await toDo.save();
    await logger.info("recep", "To do ", "Add", toDo);

    res.json(Response.successResponse(toDo));
  } catch (err) {
    await logger.error("recep", "To do ", "Add", err);
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.put("/:id", async (req, res) => {
  let body = req.body;
  try {
    let updates = {};
    if (req.params.id === undefined)
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "Validation Error!",
        "ID is required"
      );
    if (body.name) updates.name = body.name;
    if (body.description) updates.description = body.description;
    if (body.status) updates.status = body.status;
    if (body.date) updates.date = body.date;

    await ToDo.updateOne({ _id: req.params.id }, updates);
    res.json(Response.successResponse(updates));
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    if (req.params.id === undefined)
      throw new CustomError(
        Enum.HTTP_CODES.BAD_REQUEST,
        "Validation Error!",
        "ID is required"
      );
    await ToDo.deleteOne({ _id: req.params.id });
    res.json(Response.successResponse());
  } catch (err) {
    let errorResponse = Response.errorResponse(err);
    res.status(errorResponse.code).json(errorResponse);
  }
});

module.exports = router;
