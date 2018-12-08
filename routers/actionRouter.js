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

module.exports = router;