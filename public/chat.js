var socket = io();

document.getElementById('newMsgForm')
    .addEventListener('submit', function(e) {
        e.preventDefault();

        socket.emit('chat message', {
            msg: document.getElementById('msgInput').value
        });

        document.getElementById('msgInput').value = '';
    });

socket.on('chat message', function(msg) {
    console.log(msg);
})