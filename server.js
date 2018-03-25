// server.js

const express     = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser  = require('body-parser');
const db          = require('./config/db');

const app = express();

const port = 8000;

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercept OPTIONS method
    if ('OPTIONS' == req.method) {
      res.sendStatus(200);
    }
    else {
      next();
    }
};

//app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(allowCrossDomain);

MongoClient.connect(db.url, (err,database) => {
  if(err) return console.log(err);

  require('./app/routes')(app,database);
  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
})