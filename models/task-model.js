const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    list: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
}, {
    toObject: {
        transform: function(doc, ret) {
            delete ret.list;
            delete ret.__v;
        }
    },
    toJSON: {
        transform: function(doc, ret) {
            delete ret.list;
            delete ret.__v;
        }
    }
});

module.exports = mongoose.model('Task', TaskSchema);