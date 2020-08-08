module.exports = function (socket) {
    socket.on('join',(roomId,userId) => {
        console.log(roomId,userId);
    })
}