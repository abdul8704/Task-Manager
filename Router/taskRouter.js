const express = require('express')
const router = express.Router();
const controller = require('../controllers/taskController')

router.get('/', controller.getAllTasks)
router.get("/:id", controller.getOneTasks);
router.post('/', controller.createTask)
router.put('/:id', controller.updateTask)
router.patch("/:id", controller.toggleStatus);
router.delete('/:id', controller.deleteTask)


module.exports = router