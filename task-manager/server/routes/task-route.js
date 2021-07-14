const express = require('express');
const router = express.Router();

const TaskController = require('../controllers/TaskController');
const verifyToken = require('./verifyToken');

router.post('/add-tasks', verifyToken, TaskController.addTask);
router.get('/get-tasks/:id', verifyToken, TaskController.getTasks);
router.get('/:id', verifyToken, TaskController.getSpecificTask);
router.put('/:id', verifyToken, TaskController.modifyTask);
router.delete('/:id', verifyToken, TaskController.deleteTask);

module.exports = router;