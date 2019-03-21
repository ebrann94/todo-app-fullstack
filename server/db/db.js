const mongoose = require('mongoose');

const url = 'mongodb://127.0.0.1:27017/todo-fullstack';

mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (error) => {if (error) console.log(error)});