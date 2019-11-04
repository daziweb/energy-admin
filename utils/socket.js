const controller = require('../controllers/task');

module.exports = (socket) => {
  console.log('初始化成功！下面可以用socket绑定事件和触发事件了');
  // 通知其他客户端重新获取任务列表
  socket.on('socketupdate', () => {
    socket.broadcast.emit('noticeupdate');
  });
};
