const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskShema = new Schema ({
    owner: {
        type: String,
        required: true,
        min: 4,
        max: 200
    },
    name: {
        type: String,
        required: true,
        min: 4,
        max: 20
    },
    description: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    status: {
        type: Boolean,
        default: false
    },
    begin: {
        type: Date,
        default: Date.now()
    },
    end: {
        type: Date,
        default: Date.now() + 24*60*60*1000
    }
})

const Task = mongoose.model('taskShema', taskShema);
module.exports = Task;