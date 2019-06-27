const { Router } = require('express');
const List = require('../models/list-model');
const auth = require('../middleware/auth');
const { documentArrayToObjects } = require('../utils/utils');

const router = new Router();

router.get('/lists', auth, async (req, res) => {
    try {
        const lists = await List.find({ owner: req.user._id});

        for (let i = 0; i < lists.length; i++) {
            await lists[i].populate('tasks').execPopulate();
        }

        const listsObject = documentArrayToObjects(lists);
        res.send(listsObject);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.post('/lists/add-list', auth, async (req, res) => {
   try {
       const list = new List({
           ...req.body,
           owner: req.user._id
       });
       await list.save();
       res.status(201).send(list);
   } catch (e) {
       res.status(500).send();
   }
});

router.delete('/lists/:id', auth, async (res, req) => {
   try {
       await List.findOneAndDelete({ _id: req.listId });

       res.send();
   } catch (e) {
        res.status(500).send();
   }
});

router.patch('/lists/:id', auth, async (req, res) => {
    try {
        const list = await List.findOne({ _id: req.params.id });

        if (req.body.description) {
            list.description = req.body.description;
        }

        if (req.body.name) {
            list.name = req.body.name;
        }

        await list.save();
        res.send(list);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;