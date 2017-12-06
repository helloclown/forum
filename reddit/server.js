const express = require('express');
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const hasher = require('hash.js');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var db;
var date = new Date();
var i = 0;

MongoClient.connect('mongodb://helloclown:85821268lsy@ds163397.mlab.com:63397/helloclown', (err, database) => {
  if (err) return console.log(err);
  db = database;
  app.listen(8081);
});

app.listen(8080, () => {
    console.log("click here to run: https://%s:%s", process.env.IP, 8080);
  });

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/', function(req, res){

  db.collection('users').find().toArray(function(err,results){
    if (err) return console.log(err);
    for(i = 0;i < results.length;i++){
      if(results[i].username == hash(req.body.username) && results[i].password == hash(req.body.password)){

        res.cookie('cname', results[i].name);
        res.cookie('cuser', results[i].username);
        res.cookie('cpass', results[i].password);
        return res.send({success : true});
      }
    }
    return res.send({success : false});
  });
});


app.get('/home', (req, res) => {

  db.collection('msg').find().sort({date:-1}).toArray(function(err, result) {
  if (err) return console.log(err);
  res.render('home.ejs', {msg: result});
  });
});

app.post('/home', (req, res) => {
  
  db.collection('msg').save({name: req.body.cname, topic: req.body.topic, date: date, comment:[]}, (err, result) => {
      if (err) return console.log(err);

      console.log('saved to database');
      res.status(200).send({"success": true});
    });
});

app.delete('/home', (req, res) => {
  db.collection('msg').findOneAndDelete({topic: req.body.topic},
  (err, result) => {
    if (err) return res.send(500, err);
    res.send({message: 'it got deleted'});
  });
});

app.get('/signup', (req, res) => {
  res.render('signup.ejs');
});

app.post('/signup', function(req, res){

  db.collection('users').find().toArray(function(err, results){
    if (err) return console.log(err);
    for(i = 0;i < results.length;i++){
      if(results[i].username == hash(req.body.username) && results[i].name ==req.body.name){
        return res.send({success : false});
      }
    }
    db.collection('users').save({name: req.body.name, username: hash(req.body.username), password: hash(req.body.password)}, (err, result) => {
      if (err) return console.log(err);

      console.log('saved to database');
      return res.send({success : true});
    });
  });
});

app.get('/change', (req, res) => {
  res.render('change.ejs');
});

app.post('/change', (req, res) => {

  db.collection('users').findOneAndUpdate({"username": hash(req.body.username)}, {
    $set: {
      "password": hash(req.body.newpassword)
    }
  }, {
    sort: {_id: -1},
  }, (err, result) => {
    if (err) return  res.status(200).send({"success": false});
    res.status(200).send({"success": true}); 
  });
});

app.get('/go/:author/:topic', (req, res) => {

  db.collection('msg').find({name:req.params.author, topic: req.params.topic}).toArray(function(err, result) {
  if (err) return console.log(err);
  res.render('comment.ejs', {msg: result});

  });
});

app.post('/comment', (req, res) => {

  db.collection('msg').update(
   {name: req.body.author, topic: req.body.topic},
   {
     $push: {
       comment: {name: req.body.cname, comment: req.body.comment}
     }
   },(err, result) =>{
     if(err) console.log(err);

     res.status(200).send({"success": true});
   });
});

function hash(string){
    return hasher.sha256().update(string).digest('hex');
}