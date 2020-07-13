var express = require('express');
var todoController = require('./controllers/todoController');
var app = express();

//Template Engine
app.set('view engine','ejs');

//Static files
app.use(express.static('./public'))

//fire controllers
todoController(app);

app.listen(3000);
console.log('Listening to port 3000')