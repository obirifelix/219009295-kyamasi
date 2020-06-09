const express = require('express');

const app = express();

const mongoose = require('mongoose');

//connection to database
mongoose.connect('mongodb://localhost/goodhealthDB',{useNewUrlParser: true, useUnifiedTopology: true})
.then((connect)=>{ console.log('Goodhealth DB connected successfully..')})
.catch((error)=>{ console.log(error.message)});





//application middleware settings
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());


// '/' - root route/path
app.use('/', require('./routes/index'));

app.use('/student', require('./routes/student'));

app.use('/todo', require('./routes/todo'));





//application listen to port
const port = 3000 || process.env.PORT;
app.listen(port, ()=>{
    console.log('Server has started on port 3000...')
});