const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true,
        maxLength: [30, "Task cannot be more than 30 characters"],
        trim: true
    },
    isCompleted: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('Task', TaskSchema)