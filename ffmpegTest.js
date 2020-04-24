// ffmpeg -f gdigrab -framerate 30 -offset_x 10 -offset_y 20 -video_size 640x480 -show_region 1 -i desktop -r 16 -vcodec h264 -acodec aac -f flv rtmp://localhost/myapp/stream
// 使用fluent-ffmpeg需要注意顺序，inputoption
const ffmpeg = require("fluent-ffmpeg");

const ffmpegPath = "C:\\Users\\likaiboy\\ffmpeg\\bin\\ffmpeg.exe";
let command = null;
const outputPath = 'rtmp://localhost/myapp/stream';

command = ffmpeg()
    .setFfmpegPath(ffmpegPath)
    .input('desktop')
    .inputFormat('gdigrab')
    .inputOptions('-framerate 30')
    .inputOptions('-offset_x 10')
    .inputOptions('-offset_y 20')
    .inputOptions('-video_size 640x480')
    .inputOptions('-show_region 1',)
    .addOptions([
        '-r 16',
        '-vcodec h264',
        '-acodec aac'
    ])
    .format('flv')
    .output(outputPath, {
        end: true
    })
    .on('start', function (commandLine) {
        console.log('[' + new Date() + '] Vedio is Pushing !');
        console.log('commandLine: ' + commandLine);
    })
    .on('error', function (err, stdout, stderr) {
        console.log('error: ' + err.message);
    })
    .on('end', function () {
        console.log('[' + new Date() + '] Vedio Pushing is Finished !');
    });
command.run();