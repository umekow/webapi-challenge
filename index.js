/******SETUP*************/
require('dotenv').config(); 

const express = require('express');
const helmet = require('helmet'); 
const morgan = require('morgan'); 
const server = express(); 
server.use(express.json()); 
server.use(helmet);
server.use(morgan); 
const port = process.env.PORT || 5000; 

/*********END OF SETUP********/

/*********MIDDLEWARE************/


/*********END OF MIDDLEWARE************/

/*********POST************/


/*********GET************/

/*********PUT************/

/*********DELETE************/

server.listen(port, () => console.log(`Wohoo! Server is running on http://localhost:${port}`));