let socket = io();

let content = document.getElementById('content'),
    username = document.getElementById('username'),
    message = document.getElementById('message'),
    btn = document.getElementById('btn');

btn.addEventListener('click', () => {
    socket.emit('chat message', {
        username: username.value,
        message: message.value
    });
    message.value = '';
});

// 监听事件
socket.on('chat message', data => {
content.innerHTML += `<p><strong>${data.username} ：</strong>${data.message}</p>`;
})