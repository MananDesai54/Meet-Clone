const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const communication = require('./socket/socket');
const { ExpressPeerServer } = require('peer');

const app = express();
const server = require('http').Server(app);
//setup socket.io & peer server
const io = require('socket.io')(server);
const peerServer = ExpressPeerServer(server,{
    debug:true
});

app.use('/peerjs',peerServer);

//template engine and static files
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/',require('./routes/routes'));

//socket conversation
io.on('connection', socket => {
    // communication(socket);
    socket.on('join',(roomId,userId) => {
        console.log(roomId,userId);
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected',userId);
        
        socket.on('disconnect',()=>{
            socket.to(roomId).broadcast.emit('user-disconnected',userId);
        })
    })
})

server.listen(process.env.PORT || 5000 , ()=>console.log('Server is running at 127.0.0.1:5000/'));