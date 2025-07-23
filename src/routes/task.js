const Task = require('../models/task');
const express = require('express');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, async (req, res) => {
  try {
    const task = new Task({ ...req.body, owner: req.user._id });
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get('/tasks', auth, async (req, res) => {
  const match = {};
  const sort = {};
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');

    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }
  if (req.query.completed) match.completed = req.query.completed === 'true';

  try {
    /*  const tasks = await Task.find({ owner: req.user._id });
    for (const task of tasks) {
      await task.populate('owner');
    } */
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit),
        skip: parseInt(req.query.skip),
        sort,
      },
    });
    //  await tasks.populate('owner');
    res.send(req.user.tasks);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  try {
    //console.log(req.params.id);
    //console.log(req.user._id);
    const task = await Task.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send('Not found');
    await task.populate('owner');
    res.send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowUpadtes = ['description', 'completed'];
  const isAllowed = updates.every((upd) => allowUpadtes.includes(upd));
  if (!isAllowed) return res.status(400).send('Update not allowed !!!');
  try {
    const task = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      req.body,
      { new: true }
    );
    await task.populate('owner');
    res.send(task);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
