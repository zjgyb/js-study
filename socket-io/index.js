const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
// const bodyParser = require("body-parser");
// app.use(bodyParser.json({ limit: '1mb' }));  //body-parser 解析json格式数据
// app.use(bodyParser.urlencoded({            //此项必须在 bodyParser.json 下面,为参数编码
//     extended: true
// }));

// let username = '';

app.get('/', (req, res) => {
    // res.send('<h1>hello world!</h1>');
    // if(!username) {
    //     res.redirect('/login');
    // }
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/api/post/username', (req, res) => {

    let username = req.body.username;
    console.log(username);
    if(!username) {
        res.send({ status: 0 });
    } else {
        res.send({ status: 1 });
    }

});

app.get("/login", (req, res) => {
//   res.send('<h1>hello world!</h1>');
    // res.set("Content-Type", "application/json");
  res.sendFile(__dirname + "/public/login.html");
});

io.on('connection', (socket) => {
    // console.log(socket);
    let datas;
    console.log('a user connected');
    socket.on('chat message', (data) => {
        io.emit('chat message', {
            data: data,
            datas
        });
    });

    socket.on('typing', data => {
        datas = data;
        socket.broadcast.emit('typing', data);
    })
});

http.listen(3000, () => {
    console.log('listening on *:3000');
})