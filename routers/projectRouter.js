const express = require('express');
const router = express.Router();
const projectDb = require('../data/helpers/projectModel');

//GET projects
router.get('/', (req, res) => {
    projectDb.get()
        .then(projects => {
            res.json(projects);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The projects information could not be retrieved." })
        })
})

//GET one project
router.get('/:id', (req, res) => {
    const { id } = req.params;
    projectDb
        .get(id)
        .then(project => {
            if (project.id) {
                res.json(project);
            }
            else {
                res.status(404)
                    .json({ message: "The project with the specified ID does not exist." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "failed to get project" })
        })
});

//GET project's actions
router.get('/:id/actions', (req, res) => {
    const { id } = req.params;
    projectDb
        .getProjectActions(id)
        .then(action => {
            if (action.length) {
                res.json(action);
            }
            else {
                res.status(404)
                    .json({ message: "The project does not have an action yet." })
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ message: "failed to get project" })
        })
});

//POST
router.post('/', (req, res) => {
    const { name, description } = req.body;
    const newProject = { name, description };
    if (!name || !description) {
        res.status(400).json({ message: 'The project needs a name and a description' });
    }
    else {
        projectDb
            .insert(newProject)
            .then(post => res.json(post))
            .catch(err =>
                res
                    .status(500)
                    .json({ error: 'Failed to add new project.' })
            );
    }
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const newProject = req.body;
    projectDb
        .update(id, newProject)
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
    projectDb
        .remove(id)
        .then(count => {
            if (count) {
                res.json({ message: 'project successfully deleted.' })
            }
            else {
                res.status(404).json({
                    error: "The project with the specified ID does not exist."
                })
            }
        })
        .catch(err =>
            res
                .status(500)
                .json({ error: 'Failed to delete new project.' })
        );
});

module.exports = router;