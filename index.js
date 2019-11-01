/******SETUP*************/
if (process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const express = require('express');
const helmet = require('helmet'); 
const morgan = require('morgan'); 
const cors = require('cors'); 
const server = express(); 
const projects = require('./data/helpers/projectModel'); 
const actions = require('./data/helpers/actionModel'); 
server.use(express.json());
server.use(cors());
/*server.use(helmet());
server.use(morgan()); */
const port = process.env.PORT || 5000; 

/*********END OF SETUP********/







/*********MIDDLEWARE************/


function validateProjectID(req, res, next) {
    projects.get(req.params.id)
    .then(r => {
        if(r) {
            project = r; 
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
//projects
server.post('/', (req, res) => {
    projects.insert(req.body)
    .then(r => res.status(202).json(r))
    .catch(error => res.status(400).json(error))
})

//actons
server.post('/:id/actions', validateProjectID, (req, res) => {
    actions.insert({...req.body, "project_id ": Number(req.params.id)})
    .then(r => {
        res.status(202).json(project)
    })
    .catch(error => res.status(400).json(error))
})


/*********GET************/

//projects
server.get('/', (req, res) => {
    projects.get()
    .then(r => res.status(200).json(r))
    .catch(error => res.status(400).json(error))
})


server.get('/:id', validateProjectID, (req, res) => {
    projects.get(req.params.id)
    .then(r => res.status(200).json(project))
    .catch(error => res.status(400).json(error))
})

//actions
server.get('/actions', (req, res) => {
    actions.get()
    .then(r => res.status(200).json(r))
    .catch(error => res.status(400).json(error))
})

server.get('/actions/:id', (req, res) => {
    projects.get(req.params.id)
    .then(r => res.status(200).json(r))
    .catch(error => res.status(400).json(error))
})


server.get('/:id/actions', validateProjectID, (req, res) => {
    projects.getProjectActions(req.params.id)
    .then(r => res.status(200).json(project))
    .catch(error => res.status(400).json(error))

})
/*********PUT************/

//project

server.put('/:id', validateProjectID, (req, res) => {
    
    projects.update(req.params.id, req.body)
    .then(r => res.status(202).json(project))
    .catch(error => res.status(400).json(error))
})

//action
server.put('/actions/:id', (req, res) => {
    actions.update(req.params.id, req.body)
    .then(r => res.status(202).json(r))
    .catch(error => res.status(400).json(error))
})

/*********DELETE************/

//projects

server.delete('/:id', validateProjectID, (req, res) => {
    projects.remove(req.params.id)
    .then(r => res.status(200).json(project))
    .catch(error => res.status(400).json(error))
})



//actions

server.delete('/actions/:id', (req, res) => {
    actions.remove(req.params.id)
    .then(
        r => res.status(200).json(r)
    )
    .catch(error => res.status(400).json(error))
})



/**************************END OF REQUESTS********************/

server.listen(port, () => console.log(`Wohoo! Server is running on http://localhost:${port}`));