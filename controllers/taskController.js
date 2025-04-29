const TaskManagerDB = require("../models/task"); // model for taskManager database

const getAllTasks = async (req, res) => {
    try {
        const allTasks = await TaskManagerDB.find({});
        res.status(200).json({ success: true, tasks: allTasks });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
};

const getOneTasks = async (req, res) => {
    try {
        const requestedTask = await TaskManagerDB.findOne({
            _id: req.params.id,
        });
        if (!requestedTask) throw new Error("task not found");
        res.status(200).json({
            success: true,
            task: {
                _id: requestedTask._id,
                taskName: requestedTask.taskName,
                isCompleted: requestedTask.isCompleted,
            },
        });
    } catch (err) {
        res.status(404).json({ success: false, message: err.message });
    }
};

const createTask = async (req, res) => {
    try {
        const newTask = await TaskManagerDB.create({
            taskName: req.body.taskName,
            isCompleted: false,
        });
        res.status(201).json(newTask);
    } catch (err) {
        res.status(500).json(err.errors.taskName.message);
    }
};

const updateTask = async (req, res) => {
    try {
        const taskID = req.params.id;
        console.log(req.params, req.body);
        const updatedTask = await TaskManagerDB.replaceOne(
            { _id: taskID },
            req.body
        );
        const newTask = {
          _id: taskID,
          taskName: req.body.taskName,
          isCompleted: req.body.isCompleted
        }
        res.status(200).json({sucess: true, task: newTask});
    } catch (err) {
        res.status(404).json({ success: false, message: err.message });
    }
};

const toggleStatus = async (req, res) => {
    try {
        const taskID = req.params.id;
        const prevStatus = await TaskManagerDB.findOne({ _id: taskID });
        if (!prevStatus) {
            throw new Error("Task NOT found!!!");
        }
        const updatedStatus = !prevStatus.isCompleted;
        const updated = await TaskManagerDB.updateOne(
            { _id: taskID },
            { $set: { isCompleted: updatedStatus } }
        );
        res.status(200).json({ sucess: true, message: updated });
    } catch (err) {
        res.status(500).json({ success: false, messgae: err.message });
    }
};

const deleteTask = async (req, res) => {
    try {
        const taskID = req.params.id;
        const deleted = await TaskManagerDB.deleteOne({ _id: taskID });
        res.status(200).json({ success: true, message: deleted });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getAllTasks,
    getOneTasks,
    createTask,
    updateTask,
    toggleStatus,
    deleteTask,
};
