const mongoose = require("mongoose");

const schema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: "pending" },
    date: { type: Date },
  },
  {
    timestamps: {
      created_at: "created_at",
      updated_at: "updated_at",
    },
  }
);

class ToDoList extends mongoose.Model {}

schema.loadClass(ToDoList);

module.exports = mongoose.model("ToDoList", schema);
