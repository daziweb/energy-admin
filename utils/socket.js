const controller = require('../controllers/task');

module.exports = (socket) => {
  console.log('初始化成功！下面可以用socket绑定事件和触发事件了');

  // 某一客户端完成任务后 通知后台完成任务 并且通知其他客户端重新获取任务列表
  socket.on('donetask', async data => {
    // console.log('客户端发送的内容：', data);
    const task = await controller.doneTask(data);
    if ( task ) {
      const successData = {
        success: true,
        message: '操作成功'
      };
      socket.broadcast.emit('noticeupdate', successData);
      socket.emit('noticeupdate', successData);
    } else {
      const failData = {
        success: false,
        message: '操作错误'
      };
      socket.broadcast.emit('noticeupdate', failData);
      socket.emit('noticeupdate', failData);
    }
  });
};
