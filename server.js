const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const communication = require('./socket/socket');

const app = express();
const server = require('http').Server(app);
//setup socket.io
const io = require('socket.io')(server);

//template engine and static files
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/',require('./routes/routes'));

//socket conversation
io.on('connection', socket => {
    communication(socket);
})

server.listen(process.env.PORT || 5000 , ()=>console.log('Server is running at 127.0.0.1:5000/'));