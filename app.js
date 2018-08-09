const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const $ = require("jquery");

mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;

//check connection
db.once('open',function () {
    console.log('Connected to mongodb')

})


//check db error
db.on('error',function (err) {
    console.log(err);



    
})

//init app
const app = express();

const queryPath = 'https://afserviceportal.service-now.com/nav_to.do?uri=%2Fincident_list.do%3Fsysparm_query%3D';

app.use('/js', express.static(path.join(__dirname, 'js')))


const queryParams = ["caller_id","short_description","description","cmdb_ci","closed_by"];

const andOr = ["%255E","OR"]

const queryOperators = ["LIKE","IS","STARTSWITH"];
//  let queryOperators = [like];

//bring in models
let Article = require('./models/article');


//load view Engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

function asd() {
    console.log("hej");
}
//home route
app.get('/', function (req, res) {
    Article.find({}, function (err, articles) {
        if(err){
            console.log(err)
        } else {
            res.render('index', {
                title: 'Searches',
                articles: articles,
                queryPath:queryPath,
                queryOperators:queryOperators,
                data: JSON.stringify(articles),
                queryPath: JSON.stringify(queryPath)

            });
        }
    });
});

//get single article

app.get('/article/:id', function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        console.log(article.description)
        res.render('article',{
            article:article
        });
    })
});

//add route
app.get('/articles/add',function (req, res) {
    res.render('add',{
        title:'add',
        queryParams:queryParams,
        queryOperators:queryOperators,
        $:$,
        andOr:andOr
    });
});

//add submit post route
    app.post('/articles/add', function(req, res){
       let article = new Article();
       article.title = req.body.title;
       article.description = req.body.description;
        article.param = req.body.param;
        article.operator = req.body.operator;
        article.queryText = req.body.queryText;
        article.andOr = req.body.andOr;
       console.log(req.body);

       article.save(function (err) {
           if(err){
           console.log(err);
           return;
       } else {
           res.redirect('/');
       }

       })


    });

//add submit post route
app.post('/articles/edit/:id', function(req, res){
    let article = {};

    article.title = req.body.title;
    article.description = req.body.description;
    article.param = req.body.param;
    article.operator = req.body.operator;
    article.queryText = req.body.queryText;
    article.andOr = req.body.andOr;

    let query = {_id:req.params.id}

    Article.update(query, article, function (err) {
        if(err){
            console.log(err);
            return;
        } else {
            res.redirect('/');
        }

    })


});


//get single article

app.get('/article/edit/:id', function (req, res) {
    Article.findById(req.params.id, function (err, article) {
        console.log(article.description)
        res.render('edit_article',{
            title:'edit',
            article:article
        });
    })
});

//start server
app.listen(3201,function () {
    console.log('server started');
});