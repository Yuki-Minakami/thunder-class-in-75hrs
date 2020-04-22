const WebSocket = require('ws');
//新建WebSocket服务
const wss = new WebSocket.Server({ port: 3000 });

var history = [];
wss.on('connection', (ws)=> {

    ws.send(history.join("\n"));

    //监听消息
    ws.on('message', (message)=>{
        history.push(message);

        console.log( `received:${message}`); 

        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(message);
            }
        });
    });
    //连接成功
    console.log("Connected");
});
