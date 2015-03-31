module.exports = function(io) {
    io.on('connection', function(socket) {
        console.log("Hello world");


        socket.on('chat message', function(msg) {

            socket.emit('chat message', msg);
        });
    });
};