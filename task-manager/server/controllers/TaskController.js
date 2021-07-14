const Task = require('../models/Task');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const { taskValidation } = require('./validation'); 

const addTask = async (req, res) => {
    // Validation
    const { error } = taskValidation(req.body);
    if (error) {
        return res.send(error.details[0].message);
    }
    const task = new Task ({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        begin: req.body.begin,
        end: req.body.end,
        owner: req.body.owner
    })
    try {
        const _task = await task.save();
        res.send({taskId: task._id, res: "Task successfully created"});
    } catch (error) {
        res.status(400).send(error);
    }
};

const getTasks = async (req, res) => {
    const all_tasks = await Task.find({owner: req.params.id});

    res.send(all_tasks);
};

const getSpecificTask = async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findOne({ _id});
        if (!task) {
            return res.status(401).send({ error: "Task id not found" });
        }
        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
};

const modifyTask = async (req, res) => {
    // Validation
    const { error } = taskValidation(req.body);
    if (error) {
        return res.send(error.details[0].message);
    }
    Task.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        begin: req.body.begin,
        end: req.body.end
    }, {new: true})
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "task not found with id " + req.params.id
            });
        }
        res.send({res: "Task successfully modified"});
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "task not found with id " + req.params.id
                });                
            }
            return res.status(500).send({
                message: "Error updating task with id " + req.params.id
            });
        });
};


const deleteTask = async (req, res) => {
    Task.findByIdAndRemove(req.params.id)
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "task not found with id " + req.params.id
            });
        }
        res.send({message: "task deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "task not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete task with id " + req.params.id
        });
    });
};
    


module.exports = {
    addTask,
    getTasks,
    getSpecificTask,
    modifyTask,
    deleteTask
}