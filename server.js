const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

require('./db/db');
const userRouter = require('./routers/user');
const todoRouter = require('./routers/task');

// Server Setup
const publicPath = path.join(__dirname, 'front-end', 'dist');
const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use((req, res, next) => {
    console.log('Request received', req.url, req.method);
    next();
});
app.use(express.static(publicPath));
app.use('/blah', userRouter);
app.use('/blah', todoRouter);
// app.use(express.static(publicPath));

app.listen(port, () => {
    console.log('Listening on ' + port);
});