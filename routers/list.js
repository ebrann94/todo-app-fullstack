const { Router } = require('express');
const { ObjectId } = require('mongoose').Types;
const List = require('../models/list-model');
const Task = require('../models/task-model');
const auth = require('../middleware/auth');
const { documentArrayToObjects } = require('../utils/utils');

const router = new Router();

router.get('/lists', auth, async (req, res) => {
    try {
        const lists = await List.find({ owner: req.user._id });

        const promises = lists.map(list => list.populate('tasks').execPopulate());
        await Promise.all(promises);

        const listsObject = documentArrayToObjects(lists);
        res.send(listsObject);
    } catch (e) {
        res.status(500).send();
    }
});

router.post('/lists/add-list', auth, async (req, res) => {
   try {
       const list = new List({
           ...req.body,
           name: req.body.name,
           owner: req.user._id
       });
       await list.save();

       res.status(201).send(list);
   } catch (e) {
       res.status(500).send();
   }
});

router.delete('/lists/:id', auth, async (req, res) => {
   try {
       const list = await List.findOneAndDelete({ _id: req.params.id });
       // Need to delete corresponding tasks as well.
       await Task.deleteMany({ list: req.params.id });
       res.send(list);
   } catch (e) {
       console.log(e);
       res.status(500).send();
   }
});

router.patch('/lists/:id', auth, async (req, res) => {
    const {
        description,
        name,
        tasks
    } = req.body;
    try {
        const list = await List.findById(req.params.id);

        if (description) {
            list.description = description;
        }

        if (name) {
            list.name = name;
        }

        if (tasks) {
            list.tasks = tasks.map(taskId => ObjectId(taskId));
        }
        await list.save();
        await list.populate('tasks').execPopulate();

        res.send(list);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;