const { Router } = require('express');
const User = require('../models/user-model');
const auth = require('../middleware/auth');

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
        await user.populate('tasks').execPopulate();
        const token = await user.generateAuthToken();

        res.send({ user, token, tasks: user.tasks });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.map(token => token !== req.token);
        req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    // console.log('Me route active')
    try {
        await req.user.populate('tasks').execPopulate();
        res.send({
            user: req.user,
            tasks: req.user.tasks
        });
    } catch (e) {
        res.status(404).send();
        console.log(e);
    }
});

module.exports = router;