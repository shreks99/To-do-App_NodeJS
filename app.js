var express = require('express');
const { static } = require('express');

var app = express();

//Template Engine
app.set('view engine','ejs');

//Static files
app.use(express.static('./public'))

app.listen(3000);
console.log('Listening to port 3000');