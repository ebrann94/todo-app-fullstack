const jwt = require('jsonwebtoken');
const User = require('../models/user-model');

// Decodes the JSON web token in the header and finds the user it corresponds to
// If there is no user it throws an error
// Then attaches the token and user object to the req object to be passed to the route handler
const auth = async (req, res, next) => {
    // console.log('auth is working');
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        // if (!user) {
        //     throw new Error();
        // }

        req.token = token;
        req.user = user;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please Authenticate' });
    }
}

module.exports = auth;