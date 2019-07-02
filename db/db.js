const mongoose = require('mongoose');

const url = process.env.MONGODB_URL;
//mongodb+srv://todoapp:cookies123@todoapp-fvubl.mongodb.net/todoapp?retryWrites=true
mongoose.connect(url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}, (error) => {
    if (error) {
        console.log(error)
    } else {
        console.log('Connected to database');
    }
});