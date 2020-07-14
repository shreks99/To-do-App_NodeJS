var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/todo',{useUnifiedTopology: true,useNewUrlParser: true})
    .then(() => console.log('Mongodb Connected'))
    .catch(err => console.log(err));

//Create scheme 
var todoSchema = new mongoose.Schema({
    item :String
});

//Create Model
var Todo = new mongoose.model('Todo',todoSchema);
/*
var itemOne = Todo({item : 'Make sandwich'}).save(function(err){
    if(err) throw err;
    console.log('item saved');
});
*/
var data = [{item: 'get milk'},{item: 'play with dog'},{item: 'coding'}]

var urlencodedParser = bodyParser.urlencoded({ extended: false })
 
module.exports = function(app){

    app.get('/todo',function(req,res){
      //Get data from mongodb and pass it to view
        Todo.find({},function(err,data){
            if(err) throw err;
            res.render('todo',{todos : data});
        });
    });

    app.post('/todo',urlencodedParser,function(req,res){
      //Get data from view and pass it to mongodb
        var newTodo = Todo(req.body).save(function(err,data){
            if (err) throw err;
        })
       // data.push(req.body);
        res.json(data);
    });

    app.delete('/todo/:item',function(req,res){
       // Delete item from mongodb 
        Todo.find({item: req.params.item.replace(/\-/g," ")}).deleteOne(function(err,data){
            if (err) throw err;
            res.json(data);

        })
       /*
        data = data.filter(function(todo){
            return todo.item.replace(/ /g,'-') !== req.params.item;
        });
        */
        
    });
};