# 75小时雷课堂挑战
使用本人最擅长的JavaScript技术栈

## Day1 2小时
实现基础的聊天室功能
使用electron API获取实时屏幕


##day2 2 小时
花了半天了解了ffmpeg的工作方式，
1. 需要在本地运行rtmp服务器-- 借助nginx
2. 使用ffmpeg录屏并推送
3. 在浏览器中解析并展示
ffmpeg -f gdigrab -framerate 30 -offset_x 10 -offset_y 20 -video_size 640x480 -show_region 1 -i desktop -r 16 -vcodec h264 -acodec aac -f flv rtmp://localhost/myapp/stream

TODO: 目前的延迟比较高，但对这样一个大作业来讲似乎不是问题


# Day3 0.5小时
在Javascript中使用ffmpeg

#Day4 0小时
咕咕咕