const { Router } = require('express');
const User = require('../models/user-model');
const auth = require('../middleware/auth');
const { documentArrayToObjects } = require('../utils/utils');

const router = new Router();

router.post('/users/signup', async (req, res) => {
    const user = new User(req.body);

    try {
        const token = await user.generateAuthToken();
        await user.save();
        res.send({user, token, message: 'User successfully created'});
    } catch (e) {
        res.status(500).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        await user.populate({
            path: 'lists',
            populate: { path: 'tasks' }
        }).execPopulate();
        const token = await user.generateAuthToken();

        res.send({
            user,
            lists: documentArrayToObjects(user.lists),
            token
        });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token !== req.token);
        req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    try {
        await req.user.populate({
            path: 'lists',
            populate: { path: 'tasks' }
        }).execPopulate();

        res.send({
            user: req.user,
            lists: documentArrayToObjects(req.user.lists)
        });
    } catch (e) {
        res.status(404).send();
        console.log(e);
    }
});

module.exports = router;