const express = require("express");
const mongoose = require("mongoose");
const { Idea } = require("../models/Idea");

const router = express.Router();

// POST route to create a new idea
router.post("/", async (req, res) => {
  try {
    const newIdea = new Idea(req.body);
    const result = await newIdea.save();
    res.status(201).send(result);
  } catch (error) {
    console.log({ error });
    res.status(400).send(error);
  }
});

// GET route to fetch all ideas
router.get("/", async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.status(200).send(ideas);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET route to fetch all ideas
router.get("/metadata", async (req, res) => {
  try {
    const ideas = await Idea.find(
      {},
      {
        description: 1,
        title: 1,
      }
    );
    res.status(200).send(ideas);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET route to fetch a single idea by ID
router.get("/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).send({ message: "Idea not found" });
    }
    res.status(200).send(idea);
  } catch (error) {
    res.status(500).send(error);
  }
});

// PUT route to update an idea by ID
router.put("/:id", async (req, res) => {
  try {
    const idea = await Idea.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!idea) {
      return res.status(404).send({ message: "Idea not found" });
    }
    res.status(200).send(idea);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE route to delete an idea by ID
router.delete("/:id", async (req, res) => {
  try {
    const result = await Idea.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).send({ message: "Idea not found" });
    }
    res.status(204).send(); // 204 No Content
  } catch (error) {
    res.status(500).send(error);
  }
});

// validate single idea by ID
router.get("/validate/:id", async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) {
      return res.status(404).send({ message: "Idea not found" });
    }
    res.status(200).send("Idea found!");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
