var express = require ('express');
var mongoose = require('mongoose');
var mongo = require('mongodb');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var Products = require('./models/model')
var db = 'mongodb://localhost/products';

// Connect the Databade to mongoose

mongoose.connect(db);

// Check mongoose connection

// var db = mongoose.createConnection('mongodb://localhost/products', function(error){
//    if(error) console.log(error);
//        console.log("connection successful");
//});


// var Schema = mongoose.Schema;

//var productSchema = new mongoose.Schema({
//    productname: String,
//    category: String,
//    price: Number
//});

//var products = mongoose.model('products', productSchema);


//initilise the app.js
var app = express();


// BodyParser Middleware    
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Routes
app.get('/', function(req, res){
    Products.find({}, function(err, results){
        console.log(results);
         res.render('index', {
        title: "homePage",
        results: results
        });
     
    });  
});

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});
