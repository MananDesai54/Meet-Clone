module.exports = function (socket) {
    socket.on('join',(roomId,userId) => {
        console.log(roomId,userId);
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected',userId);
        
        socket.on('disconnect',()=>{
            socket.to(roomId).broadcast.emit('user-disconnected',userId);
        });
        socket.on('send-message',(message)=>{
            console.log(message);
        })
    })
}