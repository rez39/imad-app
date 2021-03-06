var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;
var crypto= require('crypto');
var bodyParser= require('body-parser');


var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
var articleone={
    title: 'articleone',
    date: '3/9/2017',
    content:` <p>
            A network is defined as a group of two or more computer systems linked together. There are many types of computer networks, including the following:</p>
<ol><li>local-area networks (LANs): The computers are geographically close together (that is, in the same building).
</li><li>wide-area networks (WANs): The computers are farther apart and are connected by telephone lines or radio waves.</li>
<li>campus-area networks (CANs): The computers are within a limited geographic area, such as a campus or military base.</li>
<li>metropolitan-area networks MANs): A data network designed for a town or city.</li>
<li>home-area networks (HANs): A network contained within a user's home that connects a person's digital devices.</li>
</ol>

<h3>Network Characteristics</h3>
<p>In addition to these types, the following characteristics are also used to categorize different types of networks:
topology : The geometric arrangement of a computer system. Common topologies include a bus, star, and ring. See the Network topology diagrams in the Quick Reference section of Webopedia.
protocol : The protocol defines a common set of rules and signals that computers on the network use to communicate. One of the most popular protocols for LANs is called Ethernet. Another popular LAN protocol for PCs is the IBM token-ring network .
architecture : Networks can be broadly classified as using either a peer-to-peer or client/server architecture.
Computers on a network are sometimes called nodes. Computers and devices that allocate resources for a network are called servers.
        </p>`
};
function createTemplate (data){
    
var title=data.title;
var content=data.content;
var date=data.date;

var htmltemplate =`<!DOCTYPE html>
<html>
    <head>
        <title>
            ${title}
        </title>
    <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
       <div class= "c"> 
            <a href="/">home</a>
        
        <hr/>
        <h1>
            ${title}
        </h1>
        <h2>
            created on ${date} 
        </h2>
       ${content}
       </div>
    </body>
</html>
`
    ;
    return htmltemplate;
    
}
function hash(input,salt)
{
    var hashed= crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    
    return ['pbkdf2Sync','this is a random-string',10000,hashed.toString('hex')].join('$')
}
app.get('/hash/:input',function(req,res)
{
   var hashedString = hash(req.params.input,'this is a random-string');
   res.send(hashedString);
   
})
app.get('create-user',function(req,res)
{
    var username= req.body.username;
    var password= req.body.password;
    
    var salt= crypto.randomBytes(128).toString('hex');
    var dbstring= hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES($1,$2)' ,[username,dbstring],function(err,result)
    {
        if(err)
        {
            res.status(500).send(err.toString());
            
        }
    
        else
        {
            res.send('usr succesfully created:'+username);
        }
    });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/articleone',function(req,res){
    res.send(createTemplate(articleone));
});
app.get('/articletwo',function(req,res){
    res.sendFile(path.join(__dirname, 'ui', 'articletwo.html'));
});
counter=0;
app.get('/counter',function(req,res)
{
    counter=counter+1;
    res.send(counter.toString());
    });
    var names=[];
   
    app.get('/submit-name/',function(req,res)
    {
        var name= req.query.name;
      names.push(name);
      res.send(JSON.stringify(names));
    });

// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
