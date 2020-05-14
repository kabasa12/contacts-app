//  Requires
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

//Routes
const contactRouter = require('./api/contactsRout');

//  Servers
const server = express();

//  Middleware
server.use( cors() );                   //  Allow CORS from * origins
server.use( bodyParser.json() );        //  Accept JSON as post input

server.use(contactRouter);

//  Start Server
server.listen(config.port, ()=>{
    console.log(`Server started at port ${config.port}`);
});

