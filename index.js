/******SETUP*************/
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const express = require('express');
const helmet = require('helmet'); 
const morgan = require('morgan'); 
const server = express(); 
const projects = require('./data/helpers/projectModel'); 
const actions = require('./data/helpers/actionModel'); 
server.use(express.json()); 
server.use(helmet());
server.use(morgan()); 
const port = process.env.PORT || 5000; 

/*********END OF SETUP********/







/*********MIDDLEWARE************/


function validateProjectID(req, res, next) {
    projects.get(req.params.id)
    .then(r => {
        if(r) {
            req.body = r; 
            next(); 
        }else{
            res.status(400).json({message : "A project with that id does not exist"}); 
        }
    }).catch(
        error => res.status(400).json(error)
    )


}

/*******END OF MIDDLEWARE******/




/*******************************************REQUESTS*****************************/

/*********POST************/
server.post('/projects', (req, res) => {
    projects.insert(req.body)
    .then(r => res.status(202).json(r))
    .catch(error => res.status(400).json(error))
})

/*********GET************/
server.get('/', (req, res) => {
    projects.get()
    .then(r => res.status(200).json(r))
    .catch(error => res.status(400).json(error))
})

/*********PUT************/

/*********DELETE************/

server.listen(port, () => console.log(`Wohoo! Server is running on http://localhost:${port}`));