const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }]
}, {
    toObject: {
        transform: function(doc, ret) {
            delete ret._id;
            delete ret.owner;
            delete ret.__v;
        },
        virtuals: true
    },
    toJSON: {
        transform: function(doc, ret) {
            delete ret._id;
            delete ret.owner;
            delete ret.__v;
        },
        virtuals: true
    }
});

// ListSchema.virtual('tasks', {
//     ref: 'Task',
//     localField: '_id',
//     foreignField: 'list'
// });

module.exports = mongoose.model('List', ListSchema);