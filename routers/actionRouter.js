const express = require('express');
const router = express.Router();
const actionDb = require('../data/helpers/actionModel');

//GET actions
router.get('/', (req, res) => {
    actionDb
        .get()
        .then(projects => {
            res.json(projects);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The actions information could not be retrieved." })
        })
})

// GET one action
router.get('/:id', (req, res) => {
    const { id } = req.params;
    actionDb
        .get(id)
        .then(action => {
            if (action) {
                res.json(action);
            }
            else {
                res.status(404)
                    .json({ message: "The action with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "failed to get action" })
        })
});

//POST
router.post('/', (req, res) => {
    const { project_id, description, notes } = req.body;
    const newAction = { project_id, description, notes };
    if (!project_id || !description || !notes) {
        res.status(400).json({ message: 'The project needs a name and a description and its project ID' });
    }
    else {
        actionDb
            .insert(newAction)
            .then(post => res.json(post))
            .catch(err =>
                res
                    .status(500)
                    .json({ error: 'Failed to add new project.' })
            );
    }
});

//PUT
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const newAction = req.body;
    actionDb
        .update(id, newAction)
        .then(project => {
            if (project) { res.json(project) }
            else {
                res
                    .status(404)
                    .json({ error: 'The project with the specified ID does not exist.' })
            }
        })
        .catch(err =>
            res
                .status(500)
                .json({ error: "Failed to update project" })
        );
});

//DELETE
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    actionDb
        .remove(id)
        .then(count => {
            if (count) {
                res.json({ message: 'action successfully deleted.' })
            }
            else {
                res.status(404).json({
                    error: "The action with the specified ID does not exist."
                })
            }
        })
        .catch(err =>
            res
                .status(500)
                .json({ error: 'Failed to delete new action.' })
        );
});

module.exports = router;