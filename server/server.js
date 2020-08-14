const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const communication = require('./socket/socket');
const { ExpressPeerServer } = require('peer');
// const multer = require('multer');

const app = express();
const server = require('http').Server(app);

//setup socket.io & peer server
const io = require('socket.io')(server);
const peerServer = ExpressPeerServer(server,{
    debug:true
});

//multer setup
// const storage = multer.diskStorage({
//     destination:'/upload',
//     filename:(req,file,cb)=>{
//         cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
//     }
// });

// const upload = multer({
//     storage:storage,
//     limits:{
//         fileSize:1000000000
//     }
// }).single('file');

app.use('/peerjs',peerServer);
app.use(bodyParser.urlencoded({
    extended:false
}))

//template engine and static files
app.set('view engine','ejs');
app.set('views','views');
app.use(express.static(path.join(__dirname,'public')))

//Routes
app.use('/',require('./routes/routes'));
// app.get('/upload/:roomId',(req,res) => {
//     upload(req,res,(err)=>{
//         if(err) {
//             console.log(err);
//             res.redirect('/room/'+req.params.roomId);
//         }else {
//             if(req.file===undefined) {
//                 console.log('not found')
//                 res.redirect('/room/'+req.params.roomId);
//             }else {
//                 console.log(req.file);
//                 res.redirect('/room/'+req.params.roomId);
//             }
//         }
//     })
// })

//socket conversation
io.on('connection', socket => {
    communication(socket);
})

server.listen(process.env.PORT || 5000 , ()=>console.log('Server is running at 127.0.0.1:5000/'));