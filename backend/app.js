const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan"); //better debugging
const cors = require("cors");

//allow using a .env file
require("dotenv").config();   

//started with converting to a class
class Server {
    constructor(port, company) {
    this.port = port
    this.app = express();

    this.app.use(express.json());
    this.app.use(morgan("dev"));

    this.app.use(cors({
     origin: '*'
    }));

    mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
    console.log("Database connection Success!");
    })
    .catch((err) => {
    console.error("Mongo Connection Error", err);
    });

    const primaryDataRoute  = require('./routes/primaryData');
    const eventsDataRoute  = require('./routes/eventsData');
    this.app.use('/primaryData', primaryDataRoute);
    this.app.use('/eventData', eventsDataRoute);
    var id  = 0
    //created get method for
    this.app.get('/', function (req,res){
      res.json({org: company})
  
    });


    this.app.use(function (err, req, res, next) {
      // logs error and error code to console
      console.error(err.message, req);
      if (!err.statusCode)
        err.statusCode = 500;
      res.status(err.statusCode).send(err.message);
    });
  }
    

  //this starts the server
  startServer(){
    this.app.listen(this.port, () => {
      console.log("Server started listening on port : ", this.port);
    });
  }
}
//gets the ports and orgs names for each of the instance
const orgs = process.env.ORG.split(",");
const ports = process.env.PORT.split(",");
//creates and insrance of class for each of the orgs in the env varible
for(org in orgs) {
    //converts port to int
    var p = parseInt(ports[org])
    var c = orgs[org]
    //creates new class 
    var company = new Server(p, c)
    //starts the server
    company.startServer()
  
}



