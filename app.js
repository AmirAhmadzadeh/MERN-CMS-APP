const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const path = require('path') ; 



const app = express();

class App {
  
  constructor() {
    
    //server setUp
    this.setExpress();
    
    // database config
    this.setMongo();
    
    //configuration
    this.setConfig();
   
   
    //Routers
    this.setRoutes();
    
    // react application   
    this.setReactClient() ;

  }

  setExpress() {

    const server = http.createServer(app);

    server.listen(config.port, (err) => {
    
      if (err) console.log('Error in setting express ' + err);
     
      console.log(`Server running on port ${config.port}`);
    
    });


  }


  setMongo() {
    mongoose.Promise = global.Promise;
    
    mongoose.connect(config.mongourl, (err => {
      if (err) console.log("Error in connection to the database");
      else { console.log('connected to db'); }
    }));
  }

  setConfig() {
    
    // browsers does not let us to connect to another local host
    app.use(cors());

    // set the static routes
    app.use(express.static('public'));

    // config body parser  
    app.use(bodyParser.json());
    
    // implement passport starategies   
    require('./passport/passport');
    require('./passport/passport-jwt');

    // config body parser  
    app.use(bodyParser.urlencoded({ extended: true }));

   

    // passposrt 
    app.use(passport.initialize());
    app.use(passport.session());

  }

  setRoutes() {  
    app.use('/api' , require('./routes/api/index'))
  }

  setReactClient()  { 
    
    
    app.use('/admin',express.static(path.join(__dirname, 'admin-client/build')));
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get('admin/*', (req,res) =>{
      res.sendFile(path.join(__dirname+'/admin-client/build/index.html'));
     });
     
    app.get('*', (req,res) =>{
      res.sendFile(path.join(__dirname+'/client/build/index.html'));
     });
  }

}

module.exports = App;

