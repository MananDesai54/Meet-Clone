const socket = io('/');

socket.emit('join',ROOM_ID,10);