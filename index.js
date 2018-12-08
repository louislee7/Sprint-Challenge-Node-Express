const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const cors = require('cors');

const projectsRoutes = require('./routers/projectRouter');
const actionsRoutes = require('./routers/actionRouter');

const server = express();
const PORT = 5050;

//middleware
server.use(express.json());
server.use(logger('tiny'));
server.use(helmet());
server.use(cors());
server.use('/api/projects', projectsRoutes);
server.use('/api/actions', actionsRoutes);

//LISTEN
server.listen(PORT, err => {
    console.log(`listening on port ${PORT}`)
})