const { model, Schema } = require("mongoose");

const RobotSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  velocity: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  resistance: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },

  dateOfCreation: {
    type: Date,
    default: Date.now,
    inmutable: true,
  },
});

const Robot = model("Robot", RobotSchema, "robots");
