const WebSocket = require('ws');
//新建WebSocket服务
const wss = new WebSocket.Server({ port: 3000 });

const ffmpeg = require("fluent-ffmpeg");
const websocketStream = require('websocket-stream/stream');

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

function pushStream(ws){
    const stream = WebSocket.createWebSocketStream(ws, { encoding: 'utf8' });
 

    try {
        ffmpeg("/live")
            .addInputOption("-rtsp_transport", "tcp", "-buffer_size", "102400")  // 这里可以添加一些 RTSP 优化的参数
            .on("start", function () {
                console.log(url, "Stream started.");
            })
            .on("error", function (err) {
                console.log(url, "An error occured: ", err.message);
            })
            .on("end", function () {
                console.log(url, "Stream end!");
                      // 摄像机断线的处理
            })

    } catch (error) {
        console.log(error);
    }
    
}

