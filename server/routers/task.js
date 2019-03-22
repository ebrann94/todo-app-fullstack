const { Router } = require('express');
const Task = require('../models/task-model');
const auth = require('../middleware/auth');

const router = new Router();

router.post('/tasks/add-task', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({_id: req.user._id});
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

router.delete('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.deleteMany( { owner: req.user._id} );
        
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id});

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

router.delete('/tasks/completed', auth, async (req, res) => {
    try {
        const tasks = await Task.deleteMany({ completed: true, owner: req.user._id });

        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id});
        task.completed = !task.completed;
        await task.save();
        res.send(task)
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;