var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));
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


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
