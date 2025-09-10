

const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Show all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.render('index', { title: "All Tasks", tasks });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).send("Server Error");
  }
});

// Show add form
router.get('/tasks/add', (req, res) => {
  res.render('add', { title: "Add Task" });
});

// Handle create task
router.post('/tasks/add', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.redirect('/');
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).send("Server Error");
  }
});

// Show edit form
router.get('/tasks/edit/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send("Task not found");
    res.render('edit', { title: "Edit Task", task });
  } catch (err) {
    console.error("Error fetching task:", err);
    res.status(500).send("Server Error");
  }
});

// Handle update task
router.post('/tasks/edit/:id', async (req, res) => {
  try {
    await Task.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
    res.redirect('/');
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).send("Server Error");
  }
});

// Handle delete task
router.post('/tasks/delete/:id', async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
