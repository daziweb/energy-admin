// 任务清单路由
const Router = require('koa-router')
const router = new Router()
const controller = require('../controllers/task')

router.prefix('/task')

router.get('/list', controller.findTaskListAll)
router.get('/user/login', controller.login)
router.get('/user/info', controller.getUserInfo)
router.post('/createtask', controller.createTask)

module.exports = router
