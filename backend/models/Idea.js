const mongoose = require("mongoose");

// Define the Schema for the "Task"
const taskSchema = new mongoose.Schema({
  name: {
    default: "",
    type: String,
    required: true, // making sure every task has a name
  },
  selected: {
    type: Boolean,
    default: false,
    required: true, // making sure the selected field is always provided
  },
});

// Define the Schema for the "Idea"
const ideaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // the title must be provided
  },
  category: {
    type: String,
    default: "",
    required: false, // the category must be provided
  },
  description: {
    type: String,
    default: "",
    required: false, // the description must be provided
  },
  features: [
    {
      default: "",
      type: String, // an array of strings for features
    },
  ],
  tasks: [], // embedding the Task schema in the Idea schema
});

// Create models
const Task = mongoose.model("Task", taskSchema);
const Idea = mongoose.model("Idea", ideaSchema);

module.exports = { Task, Idea };
