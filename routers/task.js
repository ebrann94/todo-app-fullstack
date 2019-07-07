const { Router } = require('express');
const Task = require('../models/task-model');
const List = require('../models/list-model');
const auth = require('../middleware/auth');

const router = new Router();

router.post('/tasks/add-task', auth, async (req, res) => {
    // console.log(req.body);
    const task = new Task({
        text: req.body.text,
        list: req.body.listId
    });

    try {
        // await List.findByIdAndUpdate(req.body.listId, { $push: { tasks: task._id}});
        // await task.save();
        await Promise.all([
            List.findByIdAndUpdate(req.body.listId, { $push: { tasks: task._id}}),
            task.save()
        ]);
        res.status(201).send(task);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.get('/tasks', auth, async (req, res) => {
    try {
        const tasks = await Task.find({ list: req.listId });
        res.send(tasks);
    } catch (e) {
        res.status(500).send();
    }
});


router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // console.log(req.user);
        const task = await Task.findByIdAndDelete( req.params.id );

        res.send(task);
    } catch (e) {
        // console.log(e);
        res.status(500).send();
    }
});

router.patch('/tasks/:id', auth, async (req, res) => {

    try {
        const task = await Task.findOne({_id: req.params.id});

        if (req.body.text) {
            task.text = req.body.text;
        }

        if (req.body.hasOwnProperty('completed')) {
            task.completed = req.body.completed;
        }

        await task.save();
        res.send(task)
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

module.exports = router;